const fs = require('fs')
const { resolve } = require('path')
const uniqid = require('uniqid')
const mongoose = require('mongoose')
const Contest = mongoose.model('Contest')
const Cover = mongoose.model('Cover')
const ffmpeg = require('fluent-ffmpeg')

exports.get = async (req, res, next) => {
  try {
    const count = fs.readdirSync(`${__dirname}/../src/`).filter(file => file[0] !== '.')
    count.forEach(async index => {
      const contestData = fs.readFileSync(`${__dirname}/../src/${+index}/contest.json`, 'utf8')
      const obj = JSON.parse(contestData.trim())
      const slug = uniqid()
      await Contest({
        slug,
        ...obj
      }).save()
      const contest = await Contest.find({slug},{title:1, slug: 1, sub_title: 1})
      const user = {
        _id: '﻿5b3cba8e367abf16008e331d',
        name: 'Shakes',
        picture_url: '﻿https://graph.facebook.com/2018974448325493/picture?type=large'
      }

      const dirPath = process.cwd()
      fs.readdirSync(`${__dirname}/../src/1/videos`).forEach(async file => {
        const media = fs.readFileSync(`${dirPath}/src/1/videos/${file}`)
        const full_video = dirPath+`/videos/${file}`
        fs.writeFileSync(`videos/${file}`, media)

        await Cover({
          full_video,
          contest,
          user,
          slug: uniqid(),
          teaser_path: full_video,
        }).save()

      })
    })
    res.send('Welcome to init')
  } catch (e) {
    console.log('catch', e)
  }
}

exports.video = async (req, res, next) => {
  try {
    /* cut full video */
    ffmpeg(`${process.cwd()}/src/1/videos/electric-neon-lamp.mp4`)
       .setStartTime('00:00:20')
       .setDuration('10')
       .on('end', function(err) {
         if(!err) {
           console.log('cut conversion Done');
         }
       })
       .on('error', (err) => {
         console.log('error', err)
       })
       .save(`${process.cwd()}/videos/electric-neon-lamp-cut.mp4`)

    /* save screenshot */
    ffmpeg(`${process.cwd()}/src/1/videos/electric-neon-lamp.mp4`)
       .screenshots({
         timestamps: ['50%'],
         filename: 'thumbnail-at-%s-seconds.png',
         folder: `${process.cwd()}/videos/`,
         size: '1920x1080'
       })
       .on('end', function(err) {
         if(!err) {
           console.log('images conversion Done');
         }
       })
       .on('error', (err) => {
         console.log('error', err)
       })

    res.send('cut video')
  }
  catch (e) {
    console.log(e)
  }
}
