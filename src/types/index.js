/**
 * أنواع البيانات (JSDoc) للتوثيق — البيانات الفعلية من Supabase.
 *
 * @typedef {Object} Category
 * @property {string} id
 * @property {string} name
 * @property {string} slug
 * @property {'news'|'projects'|'places'|'events'|'videos'} type
 * @property {string} [icon]
 * @property {string} [color]
 * @property {number} sort_order
 * @property {boolean} is_published
 */

/**
 * @typedef {Object} NewsItem
 * @property {string} id
 * @property {string} title
 * @property {string} slug
 * @property {string} [excerpt]
 * @property {string} [content]
 * @property {string} [cover]
 * @property {string[]} [images]
 * @property {string} [video_url]
 * @property {string|null} [category_id]
 * @property {string} [author]
 * @property {string} published_at
 * @property {boolean} is_published
 * @property {number} views
 * @property {Category|null} [category]
 */

/**
 * @typedef {Object} Project
 * @property {string} id
 * @property {string} name
 * @property {string} slug
 * @property {string} [description]
 * @property {string[]} [images]
 * @property {string} [agency]
 * @property {string|null} [start_date]
 * @property {string|null} [end_date]
 * @property {number} progress
 * @property {string} [budget]
 * @property {number|null} [latitude]
 * @property {number|null} [longitude]
 * @property {'planned'|'ongoing'|'completed'} status
 * @property {boolean} is_published
 */

/**
 * @typedef {Object} Place
 * @property {string} id
 * @property {string} name
 * @property {string} slug
 * @property {string} [description]
 * @property {string[]} [images]
 * @property {string|null} [category_id]
 * @property {string} [phone]
 * @property {string} [website]
 * @property {string} [address]
 * @property {string} [working_hours]
 * @property {number|null} [latitude]
 * @property {number|null} [longitude]
 * @property {boolean} is_featured
 * @property {boolean} is_published
 * @property {Category|null} [category]
 */

/**
 * @typedef {Object} EventItem
 * @property {string} id
 * @property {string} title
 * @property {string} slug
 * @property {string} [description]
 * @property {string[]} [images]
 * @property {string|null} [category_id]
 * @property {string} start_date
 * @property {string|null} [end_date]
 * @property {string} [location]
 * @property {number|null} [latitude]
 * @property {number|null} [longitude]
 * @property {string} [organizer]
 * @property {boolean} is_published
 * @property {Category|null} [category]
 */

/**
 * @typedef {Object} VideoItem
 * @property {string} id
 * @property {string} title
 * @property {string} [description]
 * @property {string} video_url
 * @property {string} [thumbnail]
 * @property {string|null} [category_id]
 * @property {number} [duration]
 * @property {boolean} is_published
 * @property {Category|null} [category]
 */

/**
 * @typedef {Object} Statistic
 * @property {string} id
 * @property {string} label
 * @property {number} value
 * @property {string} [icon]
 * @property {number} sort_order
 * @property {boolean} is_published
 */

/**
 * @typedef {Object} PageItem
 * @property {string} id
 * @property {string} title
 * @property {string} slug
 * @property {string} [content]
 * @property {boolean} is_published
 */

/**
 * @typedef {Object} Partner
 * @property {string} id
 * @property {string} name
 * @property {string} [logo]
 * @property {string} [website]
 * @property {number} sort_order
 * @property {boolean} is_published
 */

/**
 * @typedef {Object} Settings
 * @property {string} [site_name]
 * @property {string} [site_tagline]
 * @property {string} [site_description]
 * @property {string} [hero_image]
 * @property {string} [hero_title]
 * @property {string} [hero_subtitle]
 * @property {string} [contact_phone]
 * @property {string} [contact_email]
 * @property {string} [contact_address]
 * @property {string} [social_facebook]
 * @property {string} [social_twitter]
 * @property {string} [social_instagram]
 * @property {string} [social_youtube]
 * @property {string} [footer_text]
 */

export {};
