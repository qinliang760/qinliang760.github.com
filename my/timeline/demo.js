$(document).ready(function() {
    $('#theme').change(function() {
        var window_obj = window;

        if ($('.iphone6 iframe').length) {
            window_obj = $('.iphone6 iframe').get(0).contentWindow;
        }

        if ($(this).val() === 'default') {
            window_obj.$('link.theme').attr('href', 'css/timeline.css?key=' + (new Date()).getTime());
            window_obj.$(window_obj.document.body).css('background', '');
        } else if ($(this).val() === 'light') {
            window_obj.$('link.theme').attr('href', 'css/timeline_theme1.css?key=' + (new Date()).getTime());
            window_obj.$(window_obj.document.body).css('background', '');
        } else if ($(this).val() === 'dark') {
            window_obj.$('link.theme').attr('href', 'css/timeline_theme2.css?key=' + (new Date()).getTime());
            window_obj.$(window_obj.document.body).css('background', '#252F39');
        } else {
            window_obj.$('link.theme').attr('href', 'css/timeline_theme4.css?key=' + (new Date()).getTime());
            window_obj.$(window_obj.document.body).css('background', '');
        }
    });

    $('#demo_type').change(function() {
        changeDemo(parseInt($(this).val(), 10));
        $("#setting_switch").click();
    });

    $('#rss_feed').keyup(function(e) {
        if (e.which === 13) {
            if ($.trim($('#rss_feed').val()) !== '') {
                readRssFeed();
                $("#setting_switch").click();
            }
        }
    });

    $('#rss_feed_list').change(function(e) {
        readRssFeed($('#rss_feed_list').val());
        $("#setting_switch").click();
    });
    $("#setting_switch").on("click", function(e) {
        e.preventDefault();
        e.stopPropagation();

        $(this).toggleClass("active");
        $("#settings").toggleClass("active");
    });

    $(document).on("click", function(e) {
        $("#settings").removeClass("active");
    });

    $("#settings").on("click", function(e) {
        e.stopPropagation();
    });    
});


function changeDemo(type, is_mobile) {
    $('#timeline').remove();
    var wrapper = $('<div>').attr('id', 'timeline').appendTo('#main');

    if (is_mobile) {
        wrapper.addClass('mobile');
    }

    var timeline_data = [];
    var options       = {};

    $('#timeline').addClass('demo' + type);

    switch (type) {
        case 1:
            timeline_data = [
                {
                    type:     'iframe',
                    date:     '2014-08-12',
                    title:    'Video',
                    height:   300,
                    url:      'http://www.youtube.com/embed/ABUQP_h7RTI?rel=0&wmode=opaque'
                },
                {
                    type:     'gallery',
                    date:     '2014-04-12',
                    title:    'Mini Gallery',
                    height:   180,
                    images:   ['images/moto-1.jpg', 'images/moto-2.jpg', 'images/moto-3.jpg', 'images/moto-4.jpg']
                },
                {
                    type:     'blog_post',
                    date:     '2014-08-03',
                    title:    'Moto G review: still the best budget smartphone',
                    content:  'Last year\'s Moto G took us all by surprise. Sure, we knew Motorola wanted to reinvent the cheap smartphone experience, but the very first device in the company\'s cost crusade was even better than we expected. Let\'s be honest, though: The G\'s greatest asset was its small, small price tag. For $180 off-contract, it became awfully easy to forgive the thing for not being the quickest, the prettiest or the smartest. Still, it was one of those gadgets that wound up being more than just "good enough"; between the price and performance, the Moto G was one of the best cheap smartphones you could own, period.',
                    images:   ['images/moto-g.jpg'],
                    readmore: 'http://www.engadget.com/2014/10/03/moto-g-review-2014/'
                },
                {
                    type:     'blog_post',
                    date:     '2013-12-16',
                    height:   150,
                    images:   ['images/ios8-1.jpg', 'images/ios8-2.jpg', 'images/ios8-3.jpg'],
                    speed:    null
                },
                {
                    type:     'gallery',
                    date:     '2013-04-12',
                    title:    'iPhone 6 Plus',
                    height:   150,
                    images:   ['images/iphone6_1.jpg', 'images/iphone6_2.jpg', 'images/iphone6_3.jpg', 'images/iphone6_4.jpg', 'images/iphone6_5.jpg', 'images/iphone6_6.jpg', 'images/iphone6_7.jpg', 'images/iphone6_8.jpg', ]
                },
                {
                    type:     'blog_post',
                    date:     '2013-08-03',
                    title:    'iPhone6 Bigger than bigger',
                    content:  'iPhone 6 isn\'t simply bigger - it\'s better in every way. Larger, yet dramatically thinner. More powerful, but remarkably power-efficient. With a smooth metal surface that seamlessly meets the new Retina HD display. It\'s one continuous form where hardware and software function in perfect unison, creating a new generation of iPhone that\'s better by any measure.',
                    images:   ['images/iphone6.jpg'],
                    readmore: 'https://www.apple.com/au/iphone-6/'
                }
            ];
            options       = {
                animation:   true,
                lightbox:    true,
                separator:   'year',
                columnMode:  'dual',
                responsive_width: 700
            };
            break;
        case 2:
            timeline_data = [
                {
                    type:     'blog_post',
                    date:     '2011-09-04',
                    title:    'FA Cup',
                    content:  'The Reds go marching on in the FA Cup...',
                    images:   ['images/facup.jpg'],
                    readmore: 'http://www.manutd.com'
                },
                {
                    type:     'blog_post',
                    date:     '2011-09-03',
                    title:    'Swansea',
                    content:  'Check out our exclusive video preview ahead of today\'s clash with Swansea <a href="http://bit.ly/Yz0bmZ" target="_blank">http://bit.ly</a>. Last chance to win Michael Carrick\'s signed shirt from the Liverpool game!! Click this link to enter <a href="http://bit.ly/W03U8k" target="_blank">http://bit.ly</a>. Check out our exclusive video preview ahead of today\'s clash with Swansea <a href="http://bit.ly/Yz0bmZ" target="_blank">http://bit.ly</a>. Last chance to win Michael Carrick\'s signed shirt from the Liverpool game!! Click this link to enter <a href="http://bit.ly/W03U8k" target="_blank">http://bit.ly</a>',
                    images:   ['images/rio.jpg'],
                    readmore: 'http://www.manutd.com'
                },
                {
                    type:     'blog_post',
                    date:     '2011-07-15',
                    title:    'Manchester United VS Liverpool',
                    content:  'The Reds complete the double over Liverpool this season...',
                    images:   ['images/evra.jpg'],
                    readmore: 'http://www.manutd.com'
                },
                {
                    type:     'blog_post',
                    date:     '2011-07-29',
                    title:    'Michael Carrick',
                    content:  'Last chance to win Michael Carrick\'s signed shirt from the Liverpool game!! Click this link to enter <a href="http://bit.ly/W03U8k" target="_blank">http://bit.ly</a>',
                    images:   ['images/carric.jpg'],
                    readmore: 'http://www.manutd.com'
                },
                {
                    type:     'blog_post',
                    date:     '2011-06-02',
                    title:    'Match',
                    content:  '9 Premier League wins out of 10 this season at Old Trafford. What is your match of the season so far at the Theatre of Dreams?',
                    images:   ['images/wigan.jpg'],
                    readmore: 'http://www.manutd.com'
                },
                {
                    type:     'blog_post',
                    date:     '2011-06-13',
                    title:    'Old Traffordt',
                    content:  'Check out our exclusive video preview ahead of today\'s clash with Swansea <a href="http://bit.ly/Yz0bmZ" target="_blank">http://bit.ly</a>',
                    images:   ['images/home.jpg'],
                    readmore: 'http://www.manutd.com'
                }
            ];
            options       = {
                animation:   true,
                lightbox:    true,
                separator:   'month',
                columnMode:  'dual',
                responsive_width: 700
            };
            break;
        case 3:
            timeline_data = [
                {
                    type:     'blog_post',
                    date:     '2011-12-16',
                    height:   150,
                    images:   ['images/group.jpg', 'images/old.jpg', 'images/win.jpg'],
                    speed:    null
                },
                {
                    type:     'gallery',
                    date:     '2011-04-12',
                    title:    'Mini Gallery',
                    height:   100,
                    images:   ['images/rooney.jpg', 'images/tshirt.jpg', 'images/giggs.jpg', 'images/rio.jpg', 'images/paper.jpg']
                },
                {
                    type:     'blog_post',
                    date:     '2011-08-03',
                    title:    'Blog Post',
                    content:  '<b>Lorem Ipsum</b> is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.',
                    images:   ['images/rio.jpg'],
                    readmore: 'http://www.manutd.com'
                },
                {
                    type:     'blog_post',
                    date:     '2010-12-16',
                    height:   200,
                    images:   ['images/ferguson.jpg', 'images/paper.jpg'],
                    speed:    null
                },
                {
                    type:     'gallery',
                    date:     '2010-04-12',
                    title:    'Mini Gallery',
                    height:   150,
                    images:   ['images/stadium.jpg', 'images/rafel.jpg', 'images/logo.jpg', 'images/rvp.jpg']
                },
                {
                    type:     'blog_post',
                    date:     '2010-08-03',
                    title:    'Blog Post',
                    content:  '<b>Lorem Ipsum</b> is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.',
                    images:   ['images/evra.jpg'],
                    readmore: 'http://www.manutd.com'
                }
            ];
            options       = {
                animation:   true,
                lightbox:    true,
                separator:   null,
                columnMode:  'left'
            };
            break;
        case 4:
            timeline_data = [
                {
                    type:     'blog_post',
                    date:     '2011-12-16',
                    height:   150,
                    images:   ['images/group.jpg', 'images/old.jpg', 'images/win.jpg'],
                    speed:    null
                },
                {
                    type:     'gallery',
                    date:     '2011-04-12',
                    title:    'Mini Gallery',
                    height:   100,
                    images:   ['images/rooney.jpg', 'images/tshirt.jpg', 'images/giggs.jpg', 'images/rio.jpg', 'images/paper.jpg']
                },
                {
                    type:     'blog_post',
                    date:     '2011-08-03',
                    title:    'Blog Post',
                    content:  '<b>Lorem Ipsum</b> is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.',
                    images:   ['images/rio.jpg'],
                    readmore: 'http://www.manutd.com'
                },
                {
                    type:     'blog_post',
                    date:     '2010-12-16',
                    height:   200,
                    images:   ['images/ferguson.jpg', 'images/paper.jpg'],
                    speed:    null
                },
                {
                    type:     'gallery',
                    date:     '2010-04-12',
                    title:    'Mini Gallery',
                    height:   150,
                    images:   ['images/stadium.jpg', 'images/rafel.jpg', 'images/logo.jpg', 'images/rvp.jpg']
                },
                {
                    type:     'blog_post',
                    date:     '2010-08-03',
                    title:    'Blog Post',
                    content:  '<b>Lorem Ipsum</b> is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.',
                    images:   ['images/evra.jpg'],
                    readmore: 'http://www.manutd.com'
                }
            ];
            options       = {
                animation:   true,
                lightbox:    true,
                separator:   null,
                columnMode:  'right'
            };
            break;
    }

    var timeline = new Timeline($('#timeline'), timeline_data);
    timeline.setOptions(options);
    timeline.display();
}

function schedule() {
    var timeline_data = [
        {
            type:     'blog_post',
            date:     '2014-12-16',
            title:    'Keynote',
            content:  'Level 3'
        },
        {
            type:     'blog_post',
            date:     '2014-12-11',
            title:    'Android Studio startup station',
            content:  'Code Lab'
        },
        {
            type:     'blog_post',
            date:     '2014-12-07',
            title:    'Anroid and cloud',
            content:  'Develop Sandbox: Android'
        },
        {
            type:     'blog_post',
            date:     '2014-11-29',
            title:    'NVIDIA tooling and performance',
            content:  'Develop Andbox: Android NDK / Gaming Performance'
        },
        {
            type:     'blog_post',
            date:     '2014-11-28',
            title:    'Jank-free performance audits',
            content:  'Develop Sandbox: Chrome'
        },
        {
            type:     'blog_post',
            date:     '2014-11-18',
            title:    'Predicting the future in the Cloun',
            content:  'Develop Sandbox: Cloud'
        },
        {
            type:     'blog_post',
            date:     '2014-11-16',
            title:    'End-to-end testing and continuous integration with Dart',
            content:  'Develop Sandbox: Dart'
        },
        {
            type:     'blog_post',
            date:     '2014-11-03',
            title:    'Organizing code and managing dependencies',
            content:  'Develop Sandbox: Go'
        },
        {
            type:     'blog_post',
            date:     '2014-11-02',
            title:    'Education APIs',
            content:  'School Sandbox: Teaching Theater'
        }
    ];

    var timeline = new Timeline($('#timeline'), timeline_data);
    timeline.setOptions({
        animation:   true,
        lightbox:    true,
        separator:   false,
        columnMode:  'right',
        order:       'desc'
    });
    timeline.display();
}

function socialSearch(page_id, phone) {
    $('#timeline').remove();
    var wrapper = $('<div>').attr('id', 'timeline').addClass('facebook').appendTo('#main');

    $('#social_search').show();

    var timeline = new Timeline($('#timeline'));

    if (phone) {
        timeline._facebook_description_length = 80;
    }

    var hash_tag = $.trim($('#hashtag').val()).replace(/#/, '');

    if (hash_tag === '') {
        hash_tag = false;
    }

    page_id = page_id ? page_id : $.trim($('#facebook_page_id').val());

    // Timeline Demo:  1425148987779332|WIj0SWF_5FX8QmhcUeCdYPxl-1Q
    // Timeline Demo1: 337516366444437|4laT9FIIchMvAqnU75Zz2ICbmc0
    // Timeline Demo2: 1449434328680756|MzeTAes8c6ljUMGomsxKs_BEDv8
    var tokens = [];
    tokens.push(['1425148987779332', '1425148987779332|WIj0SWF_5FX8QmhcUeCdYPxl-1Q']);
    tokens.push(['337516366444437',  '337516366444437|4laT9FIIchMvAqnU75Zz2ICbmc0']);
    tokens.push(['1449434328680756', '1449434328680756|MzeTAes8c6ljUMGomsxKs_BEDv8']);
    var key = Math.floor(Math.random() * tokens.length);

    timeline.setOptions({
        animation:           true,
        lightbox:            true,
        separator:           'year',
        columnMode:          'dual',
        responsive_width:    700,
        twitterSearchKey:    hash_tag,
        facebookPageId:      page_id,
        facebookAppId:       tokens[key][0],
        facebookAccessToken: tokens[key][1],
        onSearchSuccess: function(data) {
            $('#social_search').hide();
        },
        onSearchError: function(data) {
            alert('No data found, please try another page ID.');
        }
    });
    timeline.display();
}

function readRssFeed(rss_feed) {
    $('#timeline').remove();
    var wrapper = $('<div>').attr('id', 'timeline').addClass('rss').appendTo('#main');

    if (typeof rss_feed === 'undefined') {
        rss_feed = $.trim($('#rss_feed').val());

        if (rss_feed === '') {
            rss_feed = 'http://www.digg.com/rss/index.xml';
        }

        $('#rss_feed').attr('placeholder', rss_feed);
    }

    $('#social_search').show();

    $.getJSON('https://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=10&q=' + rss_feed + '&callback=?', function(data) {
        $('#social_search').hide();

        var timeline_data = [];

        if (data && data.responseData && data.responseData.feed && data.responseData.feed.entries) {
            $(data.responseData.feed.entries).each(function(index, entry) {
                var date = entry.publishedDate.split(' ');

                var months = [];
                months['Jan'] = '01'; months['Feb'] = '02'; months['Mar'] = '03';
                months['Apr'] = '04'; months['May'] = '05'; months['Jun'] = '06';
                months['Jul'] = '07'; months['Aug'] = '08'; months['Sep'] = '09';
                months['Oct'] = '10'; months['Nov'] = '11'; months['Dec'] = '12';

                // Push Feed to Timeline Data
                timeline_data.push({
                    type:     'blog_post',
                    date:     date[3] + '-' + months[date[2]] + '-' + date[1],
                    title:    entry.title,
                    content:  entry.contentSnippet + '<div align="right"><a href="' + entry.link + '">Read More</a></div>'
                });
            });

            // Build Timeline
            var timeline = new Timeline($('#timeline'), timeline_data);
            timeline.setOptions({
                animation:   true,
                lightbox:    true,
                separator:   'year',
                columnMode:  'dual',
                order:       'desc',
                responsive_width: 700
            });
            timeline.display();
        } else {
            alert('No results found, please try another RSS Feed');
        }
    });
}

var getTimelineData = function(year) {
    var data = [];

    var urls = {
            "2016":[
            {
                "url":         "",
                "link":        "",
                "description": "入职网易",
                "inline":      "",
                "detail":      "入职网易"
            }
        ],
        "2015":[
            {
                "url":         "",
                "link":        "",
                "description": "入职网易",
                "inline":      "",
                "detail":      "入职网易"
            }
        ],
        "2014":[
            {
                "url":         "",
                "link":        "",
                "description": "入职网易",
                "inline":      "",
                "detail":      "入职网易"
            }
        ],
        "2013":[
            {
                "url":         "",
                "link":        "",
                "description": "入职网易",
                "inline":      "",
                "detail":      "入职网易"
            }
        ],
        "2012":[
            {
                "url":         "",
                "link":        "",
                "description": "入职网易",
                "inline":      "",
                "detail":      "入职网易"
            }
        ],
        "2011":[
            {
                "url":         "",
                "link":        "",
                "description": "入职MediaV",
                "inline":      "",
                "detail":      "入职MediaV"
            }
        ],
        "2010":[
            {
                "url":         "",
                "link":        "",
                "description": "入职MediaV",
                "inline":      "",
                "detail":      "入职MediaV"
            },        
            {
                "url":         "",
                "link":        "http://cloud.mail.163.com/fsprev/preview?product=cloudstorage.mail.163&uid=324000036462&docURL=eyJmaSI6MzI0MDAwMzk2Njc4LCJvYSI6IiIsImJrdCI6MCwiY3QiOjE0NTIwNjMyMDE0NjgsIm9vIjp0cnVlfQ",
                "description": "Markup组个人计划",
                "inline":      "",
                "detail":      "八叉乐的第一年计划"
            },
            {
                "url":         "",
                "link":        "http://cloud.mail.163.com/fsprev/preview?product=cloudstorage.mail.163&uid=324000036462&docURL=eyJmaSI6MzI0MDAwMzk2Njk1LCJvYSI6IiIsImJrdCI6MCwiY3QiOjE0NTIwNjMyMDE0NjcsIm9vIjp0cnVlfQ",
                "description": "Markup Engineer技能表",
                "inline":      "",
                "detail":      "Markup Engineer技能表"
            }            
        ],
        "2009":[
            {
                "url":         "",
                "link":        "http://u.163.com/GcAmNUBS",
                "description": "Markup Guideline",
                "inline":      "",
                "detail":      "Markup Guideline.pdf(dfXbN0rU)"
            },
            {
                "url":         "",
                "link":        "http://u.163.com/QnXXpe4D",
                "description": "Css笔记",
                "inline":      "",
                "detail":      "Css笔记(zoZK02JF)"
            },
            {
                "url":         "",
                "link":        "http://u.163.com/WkhHumOd",
                "description": "web前端开发网址收藏",
                "inline":      "",
                "detail":      "web前端开发网址收藏(FKTD9I4M)"
            }
        ]        
    }


        
        var item = urls[year];
        if(item==undefined){     
            return;
        }
        for (var i = 0; i < item.length; i++) {

            if(item[i].inline==""){
                var inline=[];
            }else{
                var inline=[item[i].inline];
            }
            if(item[i].link==""){
                var content=item[i].detail;
            }else{
                var content='<a href="' + item[i].link + '" target="_blank">'+item[i].detail+'</a>';
            }            
            data.push({
                type:     'blog_post',
                date:     year + '-08-' + Math.floor(Math.random() * 2 + 1) + Math.floor(Math.random() * 9),
                title:    item[i].description,
                images:   inline,
                content:  content
            });
        }


    return data;
};

var init_loadmore = function() {
    var timeline = new Timeline($('#timeline'), getTimelineData(2016));
    timeline.setOptions({
        animation:   true,
        lightbox:    true,
        columnMode:  'dual',
        order:       'desc',
        separator:   'year',
        first_separator: true,
        responsive_width: 700
    });
    timeline.display();

    $(document).ready(function() {
        // menu click
        $(document).on('click', '#menu > div', function(e) {
            var year      = $(this).text();
            var scroll_to = '#timeline_date_separator_' + year;
            $(this).addClass("active").siblings().removeClass("active");
            var new_data = getTimelineData(year);
            timeline.appendData(new_data);
            $.scrollTo(scroll_to, 500);
        });

        // load more click
        var year = 2016;
        $('#loadmore').on('click', function(e) {
            var button = $(this);

            if (button.hasClass('loading')) {
                return;
            }

            year--;
            button.addClass('loading').text('Loading...');
            setTimeout(function() {
                var new_data = getTimelineData(year);
                if(new_data==undefined){
                    button.addClass('loading').text("走到尽头啦");
                    return;
                }
                var scroll_to = '#timeline_date_separator_' + year;

                button.removeClass('loading').text('Load More');
                $('<div>').text(year).appendTo($('#menu')).end().addClass("active").siblings().removeClass("active");
                
                timeline.appendData(new_data);
                $.scrollTo(scroll_to, 500);
            }, 1000);
        });

        setTimeout(function() {
            $('#loadmore').show();
        }, 2000);

        $(window).scroll(function(){
            var wt=$(window).scrollTop();
            $(".date_separator").each(function(k,v){
                var ot=$(v).offset().top-20;
                if(wt>=ot){
                   $("#menu > div").eq(k).addClass("active").siblings().removeClass("active"); 
                }
            })
        })
    });
};