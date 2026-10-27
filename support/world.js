const {setWorldConstructor,World}=require('@cucumber/cucumber');
class AssessmentWorld extends World { constructor(options){super(options);this.page=null;this.browser=null;this.response=null;} }
setWorldConstructor(AssessmentWorld);
