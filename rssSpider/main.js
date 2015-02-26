//include library
var request = require('request');
var FeedParser = require('feedparser');
var cheerio = require('cheerio');
var iconv = require('iconv-lite'); 
//config and database model
var rssSite = require('./config/rssSite.json');
var Post = require('./model/Post'); 
//connect database
// var mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/test');

// var db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', main);
main();

function main() {
	//Begin catch data...
	var sites = rssSite.sites;
	sites.forEach(function (e,i) {
		if(e.work != 'false') {
			console.log('begin to parse from ' + e.from);
			var option = [];
			option.encoding = e.encoding;
			option.filter = e.filterImg;
			e.channel.forEach(function (e,i) {
				fetchRss(e.link,option,parseData);	
			})
		}
	});
	//End catch...
}bh

/**
 * @param url
 * @param option
 * @param callback 获取的新闻对象数组进一步被处理的回调函数
 */
function fetchRss(url,option,callback) {
	var posts = [];
	var req = request(url,{timeout:1000,pool:false});
	req.setMaxListeners(50);
	req.setHeader('user-agent', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/40.0.2214.111 Safari/537.36');
	req.setHeader('accept', 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8');
	var feedparser = new FeedParser({addmeta:false});
	
	req.on('error',function (err) {
		if(err) {
			console.error(err);
		}
	});
	req.on('response',function (res) {
		var stream = this;
		if(res.statusCode != 200) {
			this.emit('error',new Error('Bad status code!'));	
		}	
		stream.pipe(feedparser);
	});

	feedparser.on('error',function (err) {
		if(err) {
			console.error(err);
		}	
	});
	feedparser.on('end',function (err) {
		if(err) {
			console.error(err);
		}
		callback(posts,option);	
	});
	feedparser.on('readable',function() {
		var post;
		while(post = this.read()) {
			posts.push(transToPost(post));
		}
	});
}

/**
 * @method 将数据转换成数据库模型
 *
 */
function transToPost(post){
    var index = post.description.indexOf("......"); 
    if(index > 0){
        post.description = post.description.substr(0,index)+"......";
    }
    var mPost = new Post({
        title : post.title,
        description : post.description,
        imgs : null,
        context: null,
        link :  post.link,
        pubDate : post.pubDate
    });
    return mPost;
}

/**
 *	@tip request()方法需要{encoding:null}选项设定，使请求
 *	返回buffer方便后面进行编码，否则很容易出现编码问题
 * 
 */
function parseData(posts,option,callback) {
	posts.forEach(function (e,i) {
		request(e.link,{encoding: null},function (error,response,body) {
	 		result = iconv.decode(body, option.encoding);
			$ = cheerio.load(result,{decodeEntities:false});
			posts[i].context = $("#endText").html();
			imgs = '';
			$("#endText").find('img').each(function (i,e) {
				if((img = $(e).attr('src')) != option.filter) {
					imgs += imgs + img + ',';
				}
			});	
			posts[i].imgs = imgs;
			console.log(e);
		});
	});
}

function story() {
	var $l = true;
	var $inxi = new smart();
	var $cmj = new smart() ;

	while($l) {
		$inxi->change_statu('fool');
		echo 'look!there is funny a monkey!';
		$inxi->do_something_wrong('哪壶不开提那壶');
		$cmj->change_statu('unhappy');
		$cmj->say('I hate you!');
		$inxi->change_statu('sb');
		while($inxi->status == 'sb') {
			$inxi->loop('i am sb,i am sb....');
			//在一段很长很长的循环后......
			$inxi->change_mind('No，我要让她开心起来！');
			$inxi->change_statu('鸡血');
			break;	
		}
		//what is the result?
		$cmj->do('＜（‵□′）＞───Ｃε（┬＿┬）３');
		echo '这真是一个悲伤的故事！';
		continue;
	}	
}

   <span class="say">  while($l) {</span><br>
                <span class="say">      $inxi->change_statu('fool');</span><br>
                <span class="say">      echo 'look!there is a funny monkey!';</span><br>
                <span class="say">      $inxi->do_something_wrong('哪壶不开提那壶');</span><br>
                <span class="say">      $cmj->change_statu('unhappy');</span><br>
                <span class="say">      $cmj->say('I hate you!');</span><br></span><br>
                <span class="say">      $inxi->change_statu('xsb');</span><br>
                <span class="say">      while($inxi->status == 'xsb') {</span><br>
                <span class="say">          $inxi->loop('i am sb,i am sb....');</span><br>
                <span class="say">          //在一段很长很长的循环后......</span><br>
                <span class="say">          $inxi->change_mind('不行，我要让她开心起来！');</span><br>
                <span class="say">          $inxi->change_statu('dsb');</span><br>
                <span class="say">          break;  </span><br>
                <span class="say">      }</span><br>
                <span class="say">      //what is the result?</span><br>
                <span class="say">      $cmj->do('＜（‵□′）＞───Ｃε（┬＿┬）３');</span><br>
                <span class="say">      echo '这真是一个悲伤的故事......';</span><br>
                <span class="say">      continue;</span><br>
                <span class="say">  }</span><br>
                <span class="say">}</span><br>