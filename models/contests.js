'use strict'
const mongoose = require('mongoose')
const moment = require('moment')

const ContestSchema = mongoose.Schema(
  {
    slug: {type: String, required: true, unique: true},
    title: {type: String, required: true},
    sub_title: {type: String, default: ''},
    description: {type: String, default: ''},
    status: {type: String, default: 'PUBLISH'},
    release_date: {type: Date, default: Date.now()},
    expire_date: {type: Date, default: () => {
      return moment().add(7, 'days')
    }},
    highlight_image: {type: String, default: ''},
    cover_image: {type: String, default: ''},
    small_cover_image: {type: String, default: ''},
    tags: {type: [String], default: []},
    is_feature: {type: Boolean, default: false},
    limited: {type: Object, default: {
      isActive: false,
      amount: 0
    }},
    participant_count: {type: Number, default: 0},
    rewards: {type: Array, required: true},
    is_end: {type: Boolean, default: false},
  },
  {
    timestamps: {createdAt: 'date_created', updatedAt: 'last_updated'},
    collection: 'contests'
  }
)

ContestSchema.statics.embedData = (doc) => ({
  _id: doc._id,
  title: doc.title,
  slug: doc.slug,
  sub_title: doc.sub_title,
})

module.exports = mongoose.model('Contest', ContestSchema)