require('dotenv').config();
const express = require('express');
const path = require('path');
const loans = require('./data/loans.json');
const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, '../app')));
function bad(res, message) { return res.status(400).json({ error: message }); }
app.get('/api/health', (_req,res) => res.json({status:'ok', service:'loan-demo'}));
app.get('/api/loans', (req,res) => {
 const {type,sort='id',order='asc',page='1',limit='10',search=''} = req.query;
 if (type && !['home','personal'].includes(type)) return bad(res,'type must be home or personal');
 if (!['id','amount','rate','name'].includes(sort)) return bad(res,'invalid sort field');
 if (!['asc','desc'].includes(order)) return bad(res,'order must be asc or desc');
 if (!/^[1-9]\d*$/.test(page) || !/^[1-9]\d*$/.test(limit) || +limit > 100) return bad(res,'page/limit must be positive integers; limit <= 100');
 let rows=loans.filter(x=>(!type||x.type===type)&&x.name.toLowerCase().includes(String(search).toLowerCase()));
 rows.sort((a,b)=> { const x=a[sort],y=b[sort]; const c=typeof x==='number'?x-y:String(x).localeCompare(String(y));return order==='desc'?-c:c; });
 res.json({data:rows.slice((+page-1)*+limit,+page*+limit), total:rows.length,page:+page,limit:+limit});
});
app.get('/api/loans/:id',(req,res)=>{
 if (!/^\d+$/.test(req.params.id)) return bad(res,'id must be numeric');
 const row=loans.find(x=>x.id===+req.params.id);
 return row?res.json(row):res.status(404).json({error:'loan not found'});
});
const port=Number(process.env.PORT||3000);
app.listen(port,()=>console.log(`App running at http://127.0.0.1:${port}`));
