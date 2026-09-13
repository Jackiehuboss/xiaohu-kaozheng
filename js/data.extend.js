/* ============================================================
 * M7 行业知识拓展 + M8 上海文化深度专题
 * ============================================================ */

/* ---------- M7-1 法规速记 ---------- */
XH.laws = [
  { id:'law_1', title:'《旅游法》旅游者权利',
    body:'旅游者有权自主选择旅游产品和服务，有权拒绝旅游经营者的强制交易行为；人格尊严、民族风俗习惯和宗教信仰应受尊重。',
    term:{ zh:'自主选择权 / 强制交易', en:'the right to choose freely / forced transaction' } },
  { id:'law_2', title:'禁止不合理低价与强制购物',
    body:'旅行社不得以不合理低价组织旅游活动、诱骗旅游者，并通过安排购物或另行付费旅游项目获取回扣等不正当利益。',
    term:{ zh:'不合理低价 / 回扣', en:'unreasonably low price / kickback' } },
  { id:'law_3', title:'文明旅游义务',
    body:'旅游者在旅游活动中应遵守社会公共秩序和社会公德，尊重当地风俗习惯、文化差异和宗教禁忌，爱护旅游资源、保护生态环境。',
    term:{ zh:'文明旅游', en:'civilized tourism' } },
  { id:'law_4', title:'安全保障与告知义务',
    body:'旅游经营者应保证其提供的商品和服务符合保障人身、财产安全的要求；应事先向旅游者说明或警示旅游活动中的安全注意事项。',
    term:{ zh:'安全警示', en:'safety warning' } },
  { id:'law_5', title:'合同与变更',
    body:'旅行社与旅游者应订立书面包价旅游合同；行程开始前或途中变更行程，须协商一致；不能成团转团、拼团应征得旅游者书面同意。',
    term:{ zh:'违约 / 合同变更', en:'breach of contract / contract amendment' } },
  { id:'law_6', title:'退货与退款',
    body:'旅行社在行程中擅自安排另行付费项目或强迫购物的，旅游者有权在行程结束后30日内要求旅行社为其办理退货、垫付退货货款或退还费用。',
    term:{ zh:'退货 / 退款', en:'return of goods / refund' } },
  { id:'law_7', title:'导游执业要求',
    body:'导游和领队为旅游者提供服务必须接受旅行社委派，不得私自承揽业务；应佩戴导游证、遵守职业道德，引导旅游者文明旅游。',
    term:{ zh:'导游证 / 私自承揽', en:'tour guide license / private contracting' } },
  { id:'law_8', title:'《导游人员管理条例》计分管理',
    body:'国家对导游执业实行计分管理制度，导游有损害国家利益、民族尊严言行或欺骗、胁迫消费等行为的，将被扣分、暂扣或吊销导游证。',
    term:{ zh:'吊销导游证', en:'revocation of the tour guide license' } },
  { id:'law_9', title:'免责与救助',
    body:'旅游者在人身、财产安全遇有危险时，有权请求旅游经营者、当地政府和相关机构救助；游客自身疾病或故意、重大过失造成的损失，经营者责任依法减轻或免除。',
    term:{ zh:'救助 / 免责', en:'assistance and rescue / liability exemption' } },
  { id:'law_10', title:'突发事件应对',
    body:'发生突发事件时，旅游经营者应采取必要的救助和处置措施，依法履行报告义务，并对旅游者作出妥善安排；费用承担按法律规定与合同约定处理。',
    term:{ zh:'应急预案', en:'emergency response plan' } }
];

/* ---------- M7-2 跨文化沟通 ---------- */
XH.crossculture = [
  { id:'cc_1', title:'委婉表达：把“你必须”换成“你可以”',
    tip:'西方游客更接受建议式语气，避免命令句。',
    pairs:[
      {zh:'你必须系好安全带。',en:'You may want to fasten your seat belt.'},
      {zh:'你们不能在这里拍照。',en:'I’m afraid photography is not allowed here.'}
    ] },
  { id:'cc_2', title:'数字禁忌：13 与星期五',
    tip:'受基督教文化影响的欧美游客普遍忌讳13和星期五，安排房间、楼层、座位时可主动避开。',
    pairs:[ {zh:'我们为您安排了12层的房间，希望您住得舒心。',en:'We’ve arranged a room on the 12th floor for your comfort.'} ] },
  { id:'cc_3', title:'颜色文化：红白黑各不同',
    tip:'中国传统中红色喜庆、白色丧葬；西方婚礼以白色象征纯洁，红色有时与警告、赤字相关。礼品与服饰场合需留意。',
    pairs:[ {zh:'这件红色的纪念品在中文里寓意红红火火。',en:'In Chinese culture, this red souvenir means a flourishing and prosperous life.'} ] },
  { id:'cc_4', title:'饮食禁忌：先问、再安排',
    tip:'穆斯林游客不吃猪肉、不饮酒；印度教游客不食牛肉；部分素食者不沾荤腥。安排餐前主动确认 dietary requirements。',
    pairs:[ {zh:'请问您有没有饮食禁忌或过敏？我们可以为您准备素食或清真餐。',en:'Do you have any dietary restrictions or allergies? We can prepare vegetarian or halal meals for you.'} ] },
  { id:'cc_5', title:'隐私边界：不追问、不触碰',
    tip:'与欧美游客交谈避免询问年龄、收入、婚姻、宗教与政治；非紧急情况不发生身体接触，指引方向用整手掌而非单指。',
    pairs:[ {zh:'请问我们几点集合比较方便您？',en:'What meeting time would work best for you?'} ] },
  { id:'cc_6', title:'小费文化：入乡随俗',
    tip:'欧美游客有付小费习惯，不必推辞过度；中国无强制小费，可礼貌说明“服务费已含”。',
    pairs:[ {zh:'您的心意我们收到了，不过按规定我们不能收取小费，非常感谢！',en:'It’s very kind of you, but according to our rules we cannot accept tips. Thank you so much anyway!'} ] },
  { id:'cc_7', title:'时间观念：提前5分钟',
    tip:'商务团、欧美团时间观念强，集合务必提前到，延误要主动说明原因并致歉。',
    pairs:[ {zh:'非常抱歉迟到了十分钟，因交通管制耽误，感谢各位的耐心等待。',en:'I sincerely apologize for being ten minutes late due to traffic control. Thank you all for your patience.'} ] },
  { id:'cc_8', title:'宗教场所礼仪：先提醒再进入',
    tip:'进入寺庙、教堂前提醒着装要求（脱帽、遮肩膝）、拍照禁忌与安静要求；玉佛寺内不录像、不大声喧哗。',
    pairs:[ {zh:'进入大殿前请轻声慢行，殿内请勿拍照，谢谢您的配合。',en:'Please keep your voice low inside the hall, and photography is not permitted. Thank you for your cooperation.'} ] }
];

/* ---------- M7-3 英文服务用语（场景句库） ---------- */
XH.phraseGroups = [
  { id:'pg_greet', name:'接机问候', items:[
    {zh:'您好，请问是来自伦敦的史密斯先生吗？',en:'Excuse me, are you Mr. Smith from London?'},
    {zh:'一路辛苦了！欢迎来到上海。',en:'Did you have a good flight? Welcome to Shanghai!'},
    {zh:'我是你们在上海的地陪导游，有任何需要请随时找我。',en:'I’m your local guide in Shanghai. Please feel free to ask me for anything you need.'},
    {zh:'请大家确认一下自己的行李，我们马上上车。',en:'Please make sure you have all your luggage. We’ll board the bus shortly.'}
  ]},
  { id:'pg_bus', name:'车上讲解', items:[
    {zh:'请大家系好安全带，我们的车程大约四十分钟。',en:'Please fasten your seat belts. The ride will take about forty minutes.'},
    {zh:'利用这段时间，我先为大家简单介绍一下上海。',en:'During the ride, let me give you a brief introduction to Shanghai.'},
    {zh:'请大家记住车牌号和停车位置。',en:'Please remember our bus number and where we park.'},
    {zh:'车窗右侧可以看到东方明珠广播电视塔。',en:'On the right side of the bus, you can see the Oriental Pearl TV Tower.'}
  ]},
  { id:'pg_meal', name:'用餐安排', items:[
    {zh:'我们已为大家安排了本帮菜，口味偏甜偏浓，请慢用。',en:'We’ve arranged Benbang cuisine for you — a little sweet and rich. Please enjoy your meal.'},
    {zh:'请问有几位吃素？我让餐厅单独安排。',en:'How many vegetarians are there? I’ll ask the restaurant to prepare separate dishes.'},
    {zh:'给您倒点热茶吗？',en:'Would you like some hot tea?'},
    {zh:'晚餐六点在酒店二楼中餐厅，请准时出席。',en:'Dinner will be served at 6 p.m. at the Chinese restaurant on the second floor of the hotel.'}
  ]},
  { id:'pg_sorry', name:'突发道歉', items:[
    {zh:'非常抱歉给您带来不便，我马上为您处理。',en:'I’m very sorry for the inconvenience. I’ll deal with it right away.'},
    {zh:'请稍等片刻，我需要向旅行社确认一下。',en:'Please wait a moment while I confirm this with the travel agency.'},
    {zh:'感谢您的理解与配合。',en:'Thank you for your understanding and cooperation.'},
    {zh:'我向您保证，类似情况不会再发生。',en:'I assure you that nothing like this will happen again.'}
  ]},
  { id:'pg_buffer', name:'临场缓冲话术', items:[
    {zh:'这个问题很有意思，我先分享我所了解的内容。',en:'That’s a very interesting question. Let me share what I know about it.'},
    {zh:'恐怕我对这一点不是很确定，但我很乐意稍后帮您查证。',en:'I’m afraid I’m not quite sure about that, but I’d be happy to check it for you later.'},
    {zh:'请允许我想一想，用一个小故事来回答您。',en:'Please allow me a moment to think — let me answer with a short story.'},
    {zh:'除了您提到的这一点，我还想补充一个细节……',en:'Besides the point you mentioned, I’d also like to add one more detail…'}
  ]},
  { id:'pg_bye', name:'致欢送词', items:[
    {zh:'时间过得真快，转眼就要和大家说再见了。',en:'Time flies, and the moment to say goodbye has come.'},
    {zh:'感谢大家一路上的理解、配合与欢笑。',en:'Thank you all for your understanding, cooperation and laughter along the way.'},
    {zh:'欢迎大家以后再到上海，也欢迎把上海推荐给您的朋友。',en:'Please come back to Shanghai again, and recommend the city to your friends.'},
    {zh:'祝各位旅途平安、一切顺利！',en:'Wish you a safe journey and all the best!'}
  ]}
];

/* ---------- M8-1 海派文化专题 ---------- */
XH.haipai = [
  { id:'hp_skm', title:{ zh:'石库门：海派民居的底色', en:'Shikumen: The Backbone of Shanghai Housing' },
    body:{ zh:'石库门以花岗岩条石箍门、乌漆厚木大门得名，门头常有西式山花装饰，里弄则沿用江南住宅的天井与客堂。一幢石库门，半部上海近代史：商人、文人、革命者都曾在此居住。',
           en:'Named for their stone-framed gate and thick black wooden doors, Shikumen houses often carry Western-style pediments above the gate while keeping the Jiangnan courtyard and main hall inside. One Shikumen house holds half of Shanghai’s modern history: merchants, writers and revolutionaries all once lived there.' } },
  { id:'hp_poster', title:{ zh:'月份牌：老上海的摩登年鉴', en:'Calendar Posters: The Fashion Almanac of Old Shanghai' },
    body:{ zh:'月份牌是20世纪初上海特有的商业广告画，结合中国年画与西方擦笔水彩技法，画中穿旗袍的摩登女郎成为海派审美的代表，也是研究当时服饰、商品与生活方式的图像档案。',
           en:'Calendar posters were a Shanghai specialty of the early 20th century — commercial advertisements combining Chinese New Year pictures with Western watercolor techniques. The modern qipao-clad ladies in them became icons of Haipai taste and remain a visual archive of the era’s fashion, goods and lifestyle.' } },
  { id:'hp_jazz', title:{ zh:'爵士时代：百乐门与和平饭店', en:'The Jazz Age: The Paramount & the Peace Hotel' },
    body:{ zh:'1920-1930年代，爵士乐随外国侨民登陆上海。百乐门舞厅号称“远东第一乐府”，和平饭店老年爵士乐队成立于1980年，乐手平均年龄超过80岁，至今每晚在酒吧演奏老上海旋律。',
           en:'In the 1920s and 1930s, jazz came to Shanghai with foreign residents. The Paramount dance hall was called “the finest music palace in the Far East”. The Peace Hotel Old Jazz Band, founded in 1980 with players averaging over 80 years old, still performs old Shanghai tunes every night.' } },
  { id:'hp_qipao', title:{ zh:'海派旗袍：东方女性的神韵', en:'The Shanghai Qipao: Elegance of the East' },
    body:{ zh:'海派旗袍由满族旗装改良而来，1920年代后收腰、高开衩、滚边简约，兼顾修身美感与行动便利，是中西服饰美学融合的经典，如今仍是重要外事场合的中国名片。',
           en:'The Shanghai qipao evolved from Manchu banner robes. After the 1920s, it became waist-fitted with high side slits and simple trims — elegant yet practical, a classic fusion of Chinese and Western fashion, still worn today as a Chinese signature at major diplomatic events.' } },
  { id:'hp_food', title:{ zh:'本帮菜：浓油赤酱的上海味道', en:'Benbang Cuisine: Rich, Dark and Sweet' },
    body:{ zh:'本帮菜是上海本地风味，以“浓油赤酱”为特色，咸中带甜、注重原味。代表菜有红烧肉、响油鳝糊、油爆虾、腌笃鲜；南翔小笼馒头则以皮薄、馅多、卤重、味鲜闻名。',
           en:'Benbang cuisine is the local Shanghai cooking — rich oil and red soy sauce, salty with a note of sweetness and great respect for original flavor. Signature dishes include braised pork in soy sauce, eel paste with sizzling oil, quick-fried shrimp and salted-pork bamboo-shoot soup. Nanxiang steamed buns are prized for thin skin, generous filling and savory broth.' } }
];

/* ---------- M8-2 城市历史年表（双语） ---------- */
XH.timeline = [
  { year:'1292', title:{zh:'上海建县',en:'Shanghai County Founded'},
    body:{zh:'元朝至元二十九年设立上海县，标志着上海正式建城。',en:'In 1292, the 29th year of the Yuan Zhiyuan reign, Shanghai County was established, marking the city’s official founding.'} },
  { year:'1843', title:{zh:'开埠通商',en:'Opening as a Treaty Port'},
    body:{zh:'根据《南京条约》，上海开埠，此后租界设立，迅速成为远东重要的工商业都市。',en:'Under the Treaty of Nanjing, Shanghai opened as a treaty port. Foreign concessions followed, and the city quickly became a major industrial and commercial center of the Far East.'} },
  { year:'1921', title:{zh:'中共一大召开',en:'The First CPC National Congress'},
    body:{zh:'7月，中国共产党第一次全国代表大会在上海兴业路76号石库门建筑中召开，上海成为党的诞生地。',en:'In July, the First National Congress of the CPC was held in a Shikumen building at No. 76 Xingye Road, making Shanghai the birthplace of the Party.'} },
  { year:'1949', title:{zh:'上海解放',en:'Liberation of Shanghai'},
    body:{zh:'5月27日上海解放，城市回到人民手中，开始恢复生产、建设新上海。',en:'On May 27, Shanghai was liberated. The city returned to the people and began rebuilding production and a new urban life.'} },
  { year:'1990', title:{zh:'浦东开发开放',en:'Pudong Development & Opening-up'},
    body:{zh:'中央宣布开发开放浦东，陆家嘴随之崛起，成为中国改革开放的象征。',en:'The central government announced the development and opening-up of Pudong. Lujiazui subsequently rose as a symbol of China’s reform and opening-up.'} },
  { year:'2010', title:{zh:'上海世博会',en:'World Expo 2010'},
    body:{zh:'以“城市，让生活更美好”为主题的世博会在上海举办，184天接待游客超7300万人次。',en:'The World Expo opened in Shanghai under the theme “Better City, Better Life”, receiving over 73 million visitors in 184 days.'} },
  { year:'2013', title:{zh:'上海自贸区设立',en:'Shanghai Free Trade Zone'},
    body:{zh:'中国（上海）自由贸易试验区挂牌，是中国大陆首个自贸区。',en:'The China (Shanghai) Pilot Free Trade Zone was launched — the first free trade zone on the Chinese mainland.'} },
  { year:'2018', title:{zh:'进博会永久落户',en:'CIIE Makes Shanghai Its Home'},
    body:{zh:'首届中国国际进口博览会在上海举办，此后每年一届，成为中国扩大开放的重要平台。',en:'The first China International Import Expo was held in Shanghai and has taken place annually since, becoming a key platform for China’s wider opening-up.'} }
];

/* ---------- M8-3 国家级非遗档案 ---------- */
XH.heritage = [
  { id:'ih_lantern', name:{zh:'豫园灯会',en:'Yu Garden Lantern Show'},
    body:{zh:'每年春节至元宵举办的传统灯会，以生肖主题大型灯组和江南灯彩技艺闻名，已列入国家级非遗，是海派新年最热闹的民俗盛事。',
           en:'A traditional lantern festival held every year from the Spring Festival to the Lantern Festival, famous for huge zodiac-themed lantern sets and Jiangnan lantern craftsmanship. A national intangible heritage and Shanghai’s liveliest New Year custom.'} },
  { id:'ih_huju', name:{zh:'沪剧',en:'Huju Opera'},
    body:{zh:'沪剧是用上海方言演唱的地方戏曲，源于浦江两岸的田头山歌，擅长表现现代市民生活，《罗汉钱》《芦荡火种》是其代表剧目。',
           en:'Huju is the local opera sung in the Shanghai dialect, rooted in folk songs sung by farmers along the Huangpu River. It excels at modern urban-life stories, with representative plays such as Arhat Coin and Sparks in the Reeds.'} },
  { id:'ih_xiaolong', name:{zh:'南翔小笼馒头制作技艺',en:'Nanxiang Steamed Bun Craft'},
    body:{zh:'始于清同治年间的南翔小笼，以皮薄、馅多、卤重、味鲜著称，制作中“擀皮、打褶、上笼”全凭手上功夫，一笼14褶以上方为合格。',
           en:'Dating to the Tongzhi reign of the Qing Dynasty, Nanxiang steamed buns are known for thin skin, generous filling and savory broth. The craft lies in hand-rolling, pleating (at least 14 folds per bun) and precise steaming.'} },
  { id:'ih_guembroidery', name:{zh:'顾绣',en:'Gu Embroidery'},
    body:{zh:'顾绣源于明代上海顾名世家族，半绣半绘、以画入绣，题材多取书画名作，是江南刺绣艺术的巅峰流派之一。',
           en:'Gu embroidery originated in the Ming-dynasty family of Gu Mingshi in Shanghai. Half embroidery, half painting, it turns classical paintings into needlework and is one of the crowning schools of Jiangnan needle art.'} },
  { id:'ih_puppet', name:{zh:'海派木偶戏',en:'Shanghai-style Puppetry'},
    body:{zh:'海派木偶戏以杖头木偶为主，融合戏曲、歌舞与童话题材，造型精致、表演细腻，《孙悟空三打白骨精》是经典剧目。',
           en:'Shanghai-style puppetry centers on rod puppets, blending opera, dance and fairy tales with finely made figures and delicate performance. Monkey King Three Times Defeats the White Bone Demon is a classic play.'} }
];
