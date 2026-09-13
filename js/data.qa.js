/* ============================================================
 * M3 综合知识问答库 · 问—答—英文要点 三段卡
 * topic 对应大纲七类知识点
 * ============================================================ */
XH.qaTopics = [
  {id:'city',  name:'上海城市综合知识'},
  {id:'river', name:'一江一河'},
  {id:'nanjing', name:'南京路步行街'},
  {id:'xjh', name:'徐家汇源'},
  {id:'zjj', name:'朱家角古镇'},
  {id:'resort', name:'国际旅游度假区'},
  {id:'skm', name:'石库门建筑'}
];

XH.qa = [
/* 城市综合知识 */
{ id:'qa_city_1', topic:'city',
  q:'请简要介绍上海的行政区划和人口。',
  a:'上海是中华人民共和国直辖市，下辖16个区，全市总面积约6340平方公里，常住人口约2500万，是中国最大的经济中心城市之一。',
  en:'Shanghai is a municipality directly under the Central Government, with 16 districts, an area of about 6,340 square kilometers and a resident population of around 25 million. It is one of China’s largest economic centers.' },
{ id:'qa_city_2', topic:'city',
  q:'上海的市标和市花是什么？有什么寓意？',
  a:'上海市标由白玉兰、沙船和螺旋桨组成：沙船代表港口城市的历史，螺旋桨象征不断前进的活力，白玉兰是上海市花，象征开路先锋、奋发向上。',
  en:'The city emblem combines a magnolia flower, a junk and a propeller. The junk recalls Shanghai’s history as a port; the propeller stands for its driving vitality. The magnolia is the city flower, symbolizing a pioneer spirit.' },
/* 一江一河 */
{ id:'qa_river_1', topic:'river',
  q:'请介绍黄浦江水上旅游。',
  a:'黄浦江是上海的母亲河，水上游览是经典旅游项目。游船从外滩一带出发，沿江可欣赏外滩万国建筑博览群、陆家嘴东方明珠、上海中心等地标，日景与夜景各具魅力，“浦江游览”年接待游客数百万人次。',
  en:'The Huangpu River is Shanghai’s mother river, and a river cruise is a classic experience. Boats depart near the Bund, passing the Bund’s historic architecture and Lujiazui landmarks such as the Oriental Pearl and Shanghai Tower. Day and night cruises each have their own charm.' },
{ id:'qa_river_2', topic:'river',
  q:'苏州河旅游有什么看点？',
  a:'苏州河是吴淞江在上海市区段的称呼，曾是中国近代民族工业的摇篮。经过多年治理，如今两岸建成42公里贯通的滨河公共空间，四行仓库、M50创意园、梦清园等景点串珠成链，是海派工业遗产与城市更新的代表。',
  en:'Suzhou Creek is the urban name of the Wusong River in Shanghai and was the cradle of China’s modern national industry. After years of cleanup, 42 kilometers of continuous riverside public space now link sites like the Sihang Warehouse, the M50 art hub and Mengqing Garden — a showcase of industrial heritage and urban renewal.' },
/* 南京路 */
{ id:'qa_nanjing_1', topic:'nanjing',
  q:'请介绍上海南京路步行街。',
  a:'南京路全长约5.5公里，是上海开埠后最早建立的商业街，被誉为“中华商业第一街”。1999年，其中段（河南中路至西藏中路）改建成全天候步行街，百年老字号与大型商场林立，东端连接外滩，是游客购物观光的必到之地。',
  en:'Nanjing Road, about 5.5 kilometers long, is Shanghai’s earliest commercial street after the port opening and is called “China’s No.1 Commercial Street”. Its central section became a pedestrian street in 1999, lined with century-old shops and modern malls, leading eastward to the Bund. It is a must for shopping and sightseeing.' },
{ id:'qa_nanjing_2', topic:'nanjing',
  q:'南京路上有哪些著名老字号？',
  a:'南京路上汇聚众多百年老字号：有“点心状元”之称的王家沙、邵万生南货店、张小泉刀剪、吴良材眼镜，以及永安、先施、新新、大新“四大百货公司”旧址，它们共同构成了鲜活的海派商业博物馆。',
  en:'Nanjing Road gathers many century-old brands, such as Wangjiasha for dim sum, Shaowansheng for southern specialties, Zhang Xiaoquan scissors and Wu Liangcai opticians, as well as the former “Big Four” department stores — Wing On, Sincere, Sun Sun and Da Sun. Together they form a living museum of Haipai commerce.' },
/* 徐家汇源 */
{ id:'qa_xjh_1', topic:'xjh',
  q:'请介绍徐家汇源景区。',
  a:'徐家汇源是国家4A级旅游景区，2012年对外开放，被誉为“中西文化交汇第一站”。这里因明代科学家徐光启而得名，核心景点包括光启公园、徐光启纪念馆、徐家汇天主堂、徐家汇藏书楼和上海气象博物馆，记录了上海最早的中西文化交流。',
  en:'Xujiahui Origin is a national 4A scenic area opened in 2012, known as “the first meeting point of Chinese and Western cultures”. Named after the Ming-dynasty scientist Xu Guangqi, it includes Guangqi Park, the Xu Guangqi Memorial Hall, St. Ignatius Cathedral, the Bibliotheca Zi-Ka-Wei and the Shanghai Meteorological Museum, recording Shanghai’s earliest East-West exchanges.' },
{ id:'qa_xjh_2', topic:'xjh',
  q:'徐光启是谁？为什么徐家汇以他命名？',
  a:'徐光启是明代著名科学家、农学家，翻译《几何原本》，编纂《农政全书》，是中西文化交流的先驱。他曾在此建农庄从事农业实验，其后人世代聚居于此，因徐氏家族聚居蒲汇塘、肇嘉浜等三水交汇处，故称“徐家汇”。',
  en:'Xu Guangqi was a great Ming-dynasty scientist and agronomist who translated Euclid’s Elements and compiled the Complete Treatise on Agriculture — a pioneer of East-West exchange. He ran an experimental farm here, and his descendants settled at the confluence of three rivers; the area came to be called “Xu family junction”, or Xujiahui.' },
/* 朱家角 */
{ id:'qa_zjj_1', topic:'zjj',
  q:'请介绍朱家角古镇。',
  a:'朱家角位于上海青浦区，是上海保存最完好的江南水乡古镇之一，有“上海威尼斯”之称。早在宋元时期已成集市，镇内水巷纵横、古桥林立，九条老街依水而建，明清建筑保存完好，1991年被公布为上海首批历史文化名镇。',
  en:'Zhujiajiao, in Shanghai’s Qingpu District, is one of the best-preserved ancient water towns in the region and is called “the Venice of Shanghai”. A market town as early as the Song and Yuan dynasties, it is crisscrossed by canals and old bridges, with nine streets along the water and well-preserved Ming and Qing buildings.' },
{ id:'qa_zjj_2', topic:'zjj',
  q:'朱家角有哪些必看景点？',
  a:'朱家角的标志是明代放生桥，建于明万历年间，五孔联拱，是上海地区最大的一座石拱桥；此外还有江南园林风格的课植园、城隍庙、圆津禅院，以及北大街上的阿婆粽、扎肉等水乡小吃，乘船穿行水巷最能感受古镇韵味。',
  en:'The landmark is Fangsheng Bridge, a five-arch stone bridge built in the Wanli reign of the Ming Dynasty and the largest stone arch bridge in Shanghai. Other highlights include the Kezhi Garden, the Town God Temple and the Yuanjin Temple, plus rice dumplings and skewered pork on North Street. A canal boat ride best captures the town’s charm.' },
/* 国际旅游度假区 */
{ id:'qa_resort_1', topic:'resort',
  q:'请介绍上海国际旅游度假区。',
  a:'上海国际旅游度假区位于浦东川沙，核心项目上海迪士尼乐园于2016年6月正式开园，是中国内地首座、全球第六座迪士尼度假区。度假区还包括迪士尼小镇、星愿公园、奕欧来奥特莱斯，集主题游乐、休闲购物、生态游憩于一体。',
  en:'The Shanghai International Tourism and Resorts Zone lies in Chuansha, Pudong. Its core project, Shanghai Disneyland, opened in June 2016 — the first Disney resort on the Chinese mainland and the sixth worldwide. The zone also includes Disneytown, Wishing Star Park and the Yioulai outlets, combining theme entertainment, shopping and eco-recreation.' },
{ id:'qa_resort_2', topic:'resort',
  q:'度假区周边还有哪些配套？',
  a:'度假区毗邻浦东国际机场和虹桥枢纽，轨道交通11号线可直达迪士尼站；周边有薰衣草公园、生态园等绿色空间，全年举办各类主题活动，是长三角亲子游和周末休闲的重要目的地。',
  en:'The zone is close to Pudong International Airport and the Hongqiao transport hub, with Metro Line 11 running directly to Disney Resort Station. Nearby green spaces include a lavender park and ecological gardens. With year-round themed events, it is a top family and weekend destination in the Yangtze River Delta.' },
/* 石库门 */
{ id:'qa_skm_1', topic:'skm',
  q:'请介绍一下上海的石库门建筑。',
  a:'石库门是上海最具代表性的传统民居，诞生于19世纪60年代，融合江南民居与西方联排式住宅风格，因以石料箍门而得名。中共一大会址就是一座典型的石库门建筑。',
  en:'Shikumen is the most representative traditional residence in Shanghai. Born in the 1860s, it blends Jiangnan dwelling style with Western terraced houses, and gets its name from the stone-framed gate. The Site of the First CPC National Congress is a typical Shikumen building.' },
{ id:'qa_skm_2', topic:'skm',
  q:'石库门里弄文化有什么特色？',
  a:'石库门“一栋一户、联排而居”，催生了独特的弄堂生活：老虎窗、天井、亭子间，以及弄堂里的叫卖声、邻里情。上海话“螺蛳壳里做道场”，形容的就是石库门里精致务实的市民生活；新天地、田子坊则是石库门活化利用的代表。',
  en:'Shikumen houses stand in rows, one family per unit, fostering a unique lane culture of skylight windows, courtyards and tingzijian rooms, with street vendors’ calls and close neighborhood ties. Xintiandi and Tianzifang are leading examples of Shikumen buildings adaptively reused for modern life.' }
];
