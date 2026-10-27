const {When,Then}=require('@cucumber/cucumber');
const {request,expect}=require('@playwright/test');
When('I send JSONPlaceholder a POST with the {word} payload',async function(kind){await post(this,kind);});
When('I send JSONPlaceholder a POST with the excessively long payload',async function(){await post(this,'excessively long');});
When('I send JSONPlaceholder a POST with the special chars payload',async function(){await post(this,'special chars');});
When('I send JSONPlaceholder a POST with the missing userId payload',async function(){await post(this,'missing userId');});
async function post(world,kind){const payload={title:'Example',body:'QA boundaries',userId:1};if(kind==='excessively long')payload.title='X'.repeat(12000);if(kind==='special chars')payload.title='☃️ <script> !@#$%^&*() 🔥';if(kind==='missing userId')delete payload.userId;world.payloadType=kind;const ctx=await request.newContext({baseURL:process.env.API_BASE_URL||'https://jsonplaceholder.typicode.com'});try{const response=await ctx.post('/posts',{data:payload});world.status=response.status();world.responseBody=await response.text();}finally{await ctx.dispose();}}
Then('I record the HTTP status and check the response is not a server error',async function(){console.log(`API probe ${this.payloadType}: HTTP ${this.status} / ${this.responseBody.slice(0,120)}`);expect(this.status).toBeLessThan(500);expect(this.status).toBeGreaterThanOrEqual(200);});
