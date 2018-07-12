'use strict'
const { resolve } = require('path')
const mongoose = require('mongoose')

const CoverSchema = mongoose.Schema(
   {
     slug: {type: String, required: true, unique: true},
     full_video: {type: String, required: true},
     teaser_path: {type: String, required: true},
     user: {type: Object, required: true},
     description: {type: String, default: ''},
     status: {type: String, default: 'PUBLISH'},
     release_date: {type: Date, default: Date.now()},
     date_reported: {type: Date, default: Date.now()},
     cover_image: {type: String, default: ''},
     small_cover_image: {type: String, default: ''},
     tags: {type: [String], default: []},
     type: {type: String, default: 'VIDEO'},
     category: {type: String, default: 'normal'},
     images: {type: [String], default: []},
     contest: {type: Object, required: true},
     counter: {type: Object, default: {
         views: 0,
         favorites: 0,
         shares: 0,
         coins: 0,
         shakes: 0,
         temp_shakes: 0,
         comment: 0,
       }},
     scores: {type: Object, default: {
         buffers: [0, 0, 0, 0, 0, 0],
         trending: 0,
       }},
     reward: {type: Object, default: {}},
     isReport: {type: Boolean, default: false},
   },
   {
     timestamps: {createdAt: 'date_created', updatedAt: 'last_updated' },
     collection: 'covers'
   }
)


mongoose.model('Cover', CoverSchema)