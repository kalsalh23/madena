import { supabase, isDemoMode } from '@/lib/supabase';
import { demoCollections } from '@/lib/demoData';

/* الحقول المرتبطة بجداول العلاقات */
const SELECT_MAP = {
  categories: 'id,name,slug,type,icon,color,sort_order,is_published',
  news: 'id,title,slug,excerpt,content,cover,images,video_url,category_id,author,published_at,expires_at,is_published,views,categories(name,slug,color,icon)',
  projects: 'id,name,slug,description,images,agency,start_date,end_date,progress,budget,latitude,longitude,status,expires_at,is_published,created_at,updated_at',
  project_updates: 'id,project_id,title,body,image,created_at',
  places: 'id,name,slug,description,images,category_id,phone,website,address,working_hours,latitude,longitude,expires_at,is_featured,is_published,categories(name,slug,color,icon)',
  events: 'id,title,slug,description,images,category_id,start_date,end_date,location,latitude,longitude,organizer,expires_at,is_published,categories(name,slug,color,icon)',
  gallery: 'id,title,description,image_url,category_id,expires_at,created_at,categories(name,slug,color,icon)',
  videos: 'id,title,description,video_url,thumbnail,category_id,duration,expires_at,is_published,categories(name,slug,color,icon)',
  statistics: 'id,label,value,icon,expires_at,sort_order,is_published',
  pages: 'id,title,slug,content,expires_at,is_published',
  partners: 'id,name,logo,website,sort_order,is_published',
  settings: 'id,key,value,type',
  city_overview_stats: '*',
};

const isExpired = (row) => row?.expires_at && new Date(row.expires_at).getTime() <= Date.now();
const filterExpired = (rows, includeExpired) =>
  includeExpired ? rows : (rows || []).filter((r) => !isExpired(r));

const normalize = (table, rows) => {
  if (!rows) return rows;
  if (Array.isArray(rows)) {
    return rows.map((r) => {
      const { categories, ...rest } = r;
      return { ...rest, category: categories || null };
    });
  }
  const { categories, ...rest } = rows;
  return { ...rest, category: categories || null };
};

/* ---------------- Demo Mode ---------------- */
const demoList = (table, { filters = {}, search = '', searchFields = [], page, perPage, order, orderAsc = false }) => {
  let rows = Array.isArray(demoCollections[table]) ? [...demoCollections[table]] : [];

  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      rows = rows.filter((r) => String(r[key]) === String(value));
    }
  });

  if (search && searchFields.length) {
    const q = search.toLowerCase();
    rows = rows.filter((r) =>
      searchFields.some((f) => (r[f] || '').toString().toLowerCase().includes(q))
    );
  }

  if (order) {
    rows.sort((a, b) => {
      const av = a[order];
      const bv = b[order];
      if (av === bv) return 0;
      const cmp = av > bv ? 1 : -1;
      return orderAsc ? cmp : -cmp;
    });
  }

  const total = rows.length;
  const paged = page && perPage ? rows.slice((page - 1) * perPage, page * perPage) : rows;
  return { data: normalize(table, paged), count: total };
};

const demoGet = (table, query) => {
  if (table === 'settings') return { data: { ...demoCollections.settings } };
  if (table === 'city_overview_stats') return { data: { ...demoCollections.city_overview_stats } };
  let rows = Array.isArray(demoCollections[table]) ? [...demoCollections[table]] : [];
  Object.entries(query).forEach(([key, value]) => {
    rows = rows.filter((r) => String(r[key]) === String(value));
  });
  return { data: normalize(table, rows[0] || null) };
};

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/* ---------------- Real Supabase ---------------- */
const buildQuery = (table, { filters = {}, order, orderAsc = false, range, search = '', searchFields = [] }) => {
  let q = supabase.from(table).select(SELECT_MAP[table] || '*', { count: 'exact' });

  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') q = q.eq(key, value);
  });

  if (search && searchFields.length) {
    q = q.or(searchFields.map((f) => `${f}.ilike.%${search}%`).join(','));
  }

  if (order) q = q.order(order, { ascending: orderAsc });
  if (range) q = q.range(range.from, range.to);

  return q;
};

export const api = {
  async list(table, options = {}) {
    if (isDemoMode) {
      await sleep(350);
      const { data, count } = demoList(table, options);
      return { data: filterExpired(data, options.includeExpired), count };
    }
    const { page, perPage, ...rest } = options;
    const range = page && perPage ? { from: (page - 1) * perPage, to: page * perPage - 1 } : undefined;
    const { data, error, count } = await buildQuery(table, { ...rest, range }).returns();
    if (error) throw error;
    return { data: filterExpired(normalize(table, data), options.includeExpired), count };
  },

  async get(table, query = {}) {
    if (isDemoMode) {
      await sleep(250);
      return demoGet(table, query);
    }
    let q = supabase.from(table).select(SELECT_MAP[table] || '*').single();
    Object.entries(query).forEach(([key, value]) => {
      q = q.eq(key, value);
    });
    const { data, error } = await q;
    if (error) throw error;
    const normalized = normalize(table, data);
    if (normalized && isExpired(normalized) && !query.includeExpired) return { data: null };
    return { data: normalized };
  },

  async getById(table, id) {
    return this.get(table, { id });
  },

  async getBySlug(table, slug) {
    return this.get(table, { slug });
  },

  async count(table, filters = {}) {
    if (isDemoMode) return demoList(table, { filters }).count;
    let q = supabase.from(table).select('*', { count: 'exact', head: true });
    Object.entries(filters).forEach(([key, value]) => {
      q = q.eq(key, value);
    });
    const { count, error } = await q;
    if (error) throw error;
    return count;
  },

  async create(table, payload) {
    if (isDemoMode) throw new Error('وضع العرض التجريبي — اربط Supabase لتعديل البيانات');
    const { data, error } = await supabase.from(table).insert(payload).select().single();
    if (error) throw error;
    return { data };
  },

  async update(table, id, payload) {
    if (isDemoMode) throw new Error('وضع العرض التجريبي — اربط Supabase لتعديل البيانات');
    const { data, error } = await supabase.from(table).update(payload).eq('id', id).select().single();
    if (error) throw error;
    return { data };
  },

  async remove(table, id) {
    if (isDemoMode) throw new Error('وضع العرض التجريبي — اربط Supabase لتعديل البيانات');
    const { error } = await supabase.from(table).delete().eq('id', id);
    if (error) throw error;
    return { data: true };
  },

  async settings() {
    if (isDemoMode) {
      await sleep(200);
      return { data: { ...demoCollections.settings } };
    }
    const { data, error } = await supabase.from('settings').select('key,value');
    if (error) throw error;
    const obj = {};
    data.forEach((s) => {
      obj[s.key] = s.value;
    });
    return { data: obj };
  },

  async saveSettings(entries) {
    if (isDemoMode) throw new Error('وضع العرض التجريبي — اربط Supabase لتعديل البيانات');
    const rows = Object.entries(entries).map(([key, value]) => ({
      key,
      value: String(value),
      updated_at: new Date().toISOString(),
    }));
    const { error } = await supabase.from('settings').upsert(rows, { onConflict: 'key' });
    if (error) throw error;
    return { data: true };
  },

  async overview() {
    if (isDemoMode) {
      await sleep(200);
      return { data: { ...demoCollections.city_overview_stats } };
    }
    const { data, error } = await supabase.from('city_overview_stats').select('*').single();
    if (error) throw error;
    return { data };
  },

  async searchAll(query) {
    const q = query.trim();
    if (!q) return { news: [], projects: [], places: [], events: [] };
    const [news, projects, places, events] = await Promise.all([
      this.list('news', { search: q, searchFields: ['title', 'excerpt', 'content'], perPage: 5, page: 1 }),
      this.list('projects', { search: q, searchFields: ['name', 'description'], perPage: 5, page: 1 }),
      this.list('places', { search: q, searchFields: ['name', 'description', 'address'], perPage: 5, page: 1 }),
      this.list('events', { search: q, searchFields: ['title', 'description', 'location'], perPage: 5, page: 1 }),
    ]);
    return { news: news.data, projects: projects.data, places: places.data, events: events.data };
  },
};

export { isDemoMode };
