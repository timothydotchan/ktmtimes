var express= require('express')
	http = require('http')
	solr= require('solr')
	path = require('path')

var app = express();


app.use(express.static(path.join(__dirname, 'public')));


app.get('/',function(req,res){
	res.render('./public/index.html');
})


// GET /search?q=<QUERY> 
app.get('/api/search',function(req,res){
	var queryFromRequest=req.query.q;
	var query = 'text:'+queryFromRequest;

	var client = solr.createClient();
    client.query(query, function(error, response) {
        if (error) {
        	res.json(error);
        }
        var solrResponse=JSON.parse(response)
        var docs=solrResponse.response.docs

        var contents=[];
        for(var i = 0; i < docs.length; i ++){
            var title=docs[i]["title"][0];
            var text=docs[i]["description"];
            var id=docs[i]["id"]
            var newContent={};
            newContent.title=title;
            newContent.text=text;
            newContent.link=id;
            contents.push(newContent);
        }
        res.json(contents);
    });
})


app.get('/api/test',function(req,res){

     var data=[
        {
            title:"Iran Nuclear Talks ‘Remain Hard,’ Top Diplomats Say",
            text:"Secretary of State John Kerry and top diplomats struggled to complete an agreement with Iran that would temporarily freeze Tehran’s nuclear program and lay the foundation for a more comprehensive accord."
        },
        {
            title:"Tension and Flaws Before Health Care Website Crash",
            text:"nterviews and documents offer new details into how the rollout of President Obama’s signature program turned into a major humiliation."
        },
        {
            title:"Urbanites Flee China’s Smog for Blue Skies",
            text:"China is undergoing a surprising reverse migration: As millions leave to find work in the cities, some well-educated urban dwellers are relocating to small towns."
        },
        {
            title:"Holiday Finds Congress Well Short of Goals",
            text:"The Senate vote to end filibusters for most presidential nominees is just one symptom of the deep level of dysfunction coursing through Congress less than a year before midterm elections."
        },
        {
            title:"Immigration Advocates Pick G.O.P. Targets",
            text:"Representative Scott Tipton, Republican of Colorado, rode a Tea Party wave to Congress, but now faces the pressure of many in his district who want an overhaul. "
        },
        {
            title:"N.S.A. Report Outlined Goals for More Power",
            text:"The top-secret document described strategies to keep pace with technology and stay ahead of outside adversaries. "
        }
      ];
	res.json(data);
})

/*
// customer
// customer/contact
//customer/20
app.get('/customers/:id',function(req,res){
	res.send('Welcome to customers!' + req.params.id);
})

app.get('/customers/create',function(req,res){
	res.send('this page is for creating customers');
})
*/

app.listen('80');
