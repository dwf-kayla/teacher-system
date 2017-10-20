require.config({
    baseUrl:"/views/assets",
    paths:{
        "jquery":"jquery/jquery",
        "cookie":"jquery-cookie/jquery.cookie",
        "template":"artTemplate/template-web",
        "form":"jquery-form/jquery.form",
        "bootstrap": "bootstrap/js/bootstrap",
        "utils":"../static/lib/utils",//这个../表示从assets出来。
        "datepicker": "bootstrap-datepicker/js/bootstrap-datepicker",
        "datepickerCN": "bootstrap-datepicker/locales/bootstrap-datepicker.zh-CN.min",
        "nprogress":"nprogress/nprogress",
        "validate":"jquery-validate/jquery-validate",
        "ckeditor":"ckeditor/ckeditor",
        "uploadify":"uploadify/jquery.uploadify",
        "region": "jquery-region/jquery.region",
        "jcrop":"Jcrop/js/Jcrop"

    },
    shim:{
        "bootstrap":{
            deps:["jquery"]
        },
        "datepickerCN":{
            deps:["jquery"]
        },
        "validate":{
            deps:["jquery"]
        },
        "ckeditor":{
            exports:"CKEDITOR"
        },
        "uploadify": {
            deps: ["jquery"]
        },
        "jcrop":{
            deps:["jquery"]
        }
    }
})