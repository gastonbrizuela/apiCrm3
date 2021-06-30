const TemplateModel = require('../models/template.model');
const HttpException = require('../utils/HttpException.utils');
const {validationResult} = require('express-validator')
const keygen = require('keygenerator')
const puppeteer = require('puppeteer')
const dotenv = require('dotenv');
dotenv.config();

class TemplateController{
    createTemplate = async(req,res,next)=>{
        let keyTemplate = await this.getIdImageTemplate(req.body.Html)
        req.body.IdImage = keyTemplate
        const result = await TemplateModel.create(req.body)
        if (!result) {
            throw new HttpException(500, 'Something went wrong');
        }

        res.status(201).send('Campaign was created!');
    }
    getAllTemplate = async(req,res,next)=>{
        let TemplateList = await TemplateModel.find();
        if (!TemplateList.length){
            throw new HttpException(404, 'Campaign not found')
        }
        res.send(TemplateList)      

    }
    getIdImageTemplate = async(html)=> {
        const keyImage = keygen._();
        await this.generateImageTemplate(keyImage,html)
        return keyImage
    }

    generateImageTemplate = async(keyImage,html)=>{
        const browser = await puppeteer.launch();
        const page = await browser.newPage()
        await page.setViewport({
            width: 640,
            height: 1000,
          });
        await page.setContent(html)
        await page.screenshot({path: `${process.cwd()}/assets/imageTemplate/${keyImage}.png`})
        await browser.close()
    }
}

module.exports = new TemplateController;