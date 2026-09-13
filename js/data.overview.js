/* ============================================================
 * M1 概况讲解库 · 预置双语数据
 * 段落 v:3 = 3分钟精简版&5分钟完整版均含；v:5 = 仅5分钟完整版
 * 口吻：面向游客的导游讲解（考场上面向考官进行角色扮演）
 * 篇幅：3分钟版约300-360英文词；完整版含故事约320-430英文词
 * 英文全部使用简单词汇、短句，并包含真实历史小故事
 * ============================================================ */
window.XH = window.XH || {};

XH.facts = [
  { icon:'📍', t:{zh:'城市定位',en:'City Positioning'},
    d:{ zh:'上海是中国直辖市之一，国际经济、金融、贸易、航运和科技创新中心，正在建设具有世界影响力的社会主义现代化国际大都市。',
        en:'Shanghai is one of the four big cities of China run directly by the central government. It is a leading center of business, banking, trade, shipping and new technology, and is growing into a great modern world city.' } },
  { icon:'🗺️', t:{zh:'地理环境',en:'Geography'},
    d:{ zh:'上海地处长江入海口、中国大陆海岸线中点，是长江流域的门户，东临东海，南接杭州湾，黄浦江与苏州河穿城而过；地势平坦，平均海拔仅2.19米，气候温和湿润、四季分明。',
        en:'Shanghai sits at the mouth of the Yangtze River, on the east coast of China. It is the gate of the Yangtze River Valley. The land is flat, only 2.19 meters above the sea on average, with many rivers and a mild, wet climate and four clear seasons.' } },
  { icon:'📜', t:{zh:'历史沿革',en:'History'},
    d:{ zh:'约6000年前上海西部已成陆，一千多年前还是小渔村；1292年建县，1843年开埠；1921年中国共产党在此诞生；1990年浦东开发开放；2010年举办世博会；如今中国国际进口博览会永久落户上海。',
        en:'About 6,000 years ago, western Shanghai became dry land, and a thousand years ago it was just a fishing village. It became a county in 1292 and opened as a trading port in 1843. The CPC was founded here in 1921, Pudong opened up in 1990, and the World Expo was held here in 2010.' } },
  { icon:'👥', t:{zh:'面积人口',en:'Area & Population'},
    d:{ zh:'全市总面积约6340.5平方公里，下辖16个区，常住人口超过2400万，是中国最大的经济中心城市之一。',
        en:'Shanghai covers about 6,340.5 square kilometers, has 16 districts and over 24 million people. It is one of the largest economic centers in China.' } },
  { icon:'🏛️', t:{zh:'行政区划',en:'Administration'},
    d:{ zh:'上海下辖16个区，包括黄浦、静安、徐汇、浦东等；浦东新区是城市发展的标志性窗口。',
        en:'Shanghai has 16 districts, such as Huangpu, Jing’an, Xuhui and Pudong. Pudong New Area is the best example of the city’s fast growth.' } },
  { icon:'🌸', t:{zh:'市标市花',en:'Symbols'},
    d:{ zh:'上海市标以白玉兰、沙船和螺旋桨组成，象征这座城市的历史与活力；市花为白玉兰花。',
        en:'The city emblem is made of a white magnolia flower, a sailing junk and a propeller. It shows the city’s history and energy. The magnolia is also the city flower.' } },
  { icon:'🏯', t:{zh:'旅游资源',en:'Tourism Resources'},
    d:{ zh:'外滩、老城厢（豫园）、陆家嘴、人民广场是四大经典景区，2016年上海迪士尼度假区开园；红色文化、海派文化、江南文化在此交融，都市观光与水乡古镇各具魅力。',
        en:'The Bund, the Old Town with Yu Garden, Lujiazui and People’s Square are the top attractions, and Shanghai Disney Resort opened in 2016. Red, Haipai and Jiangnan cultures meet here, with both modern sights and old water towns.' } },
  { icon:'💡', t:{zh:'城市精神',en:'City Spirit'},
    d:{ zh:'上海城市精神是“海纳百川、追求卓越、开明睿智、大气谦和”，城市品格是“开放、创新、包容”。',
        en:'The spirit of Shanghai is: welcome everyone, aim for the best, stay wise and open, and be kind and modest. The character of the city is open, creative and inclusive.' } }
];

XH.overview = [
/* ---------- 上海城市概况 ---------- */
{
  id:'ov_city', cat:'city', score:10,
  title:{ zh:'上海城市概况讲解', en:'Commentary: An Overview of Shanghai' },
  keywords:[
    {zh:'直辖市',en:'municipality'}, {zh:'长江入海口',en:'mouth of the Yangtze River'},
    {zh:'春申君',en:'Lord Chunshen'}, {zh:'简称“申”“沪”',en:'short names “Shen” and “Hu”'},
    {zh:'浦东新区',en:'Pudong New Area'}, {zh:'城市精神',en:'city spirit'},
    {zh:'白玉兰',en:'white magnolia'}, {zh:'迪士尼度假区',en:'Disney Resort'}
  ],
  body:[
    { v:3, zh:'各位游客朋友，欢迎来到上海！我是你们的本地导游小胡。先带大家快速认识一下这座城市。上海是中国四个直辖市之一，也是商业、金融、贸易、航运和科技创新中心，更是世界上变化最快的城市之一，和纽约、伦敦、东京站在同一行列。',
      en:'Ladies and gentlemen, welcome to Shanghai! I’m Xiao Hu, your local guide. Shanghai is one of the four big cities in China run directly by the central government, and a leading center of business, banking, trade, shipping and new technology. It is one of the fastest-changing cities in the world, standing in the same league as New York, London and Tokyo.' },
    { v:3, zh:'上海位于中国东部海岸，正好在长江入海口，是整个长江流域的大门，东面就是东海。黄浦江把城市分成浦东、浦西两部分。这里地势平坦，平均海拔只有2.19米，水网密布。上海气候温和湿润、四季分明，春天和秋天最适合游览——春天市花白玉兰盛开，格外美丽。',
      en:'Shanghai sits on China’s east coast, right at the mouth of the Yangtze River — the gate of the Yangtze River Valley, with the East China Sea to its east. The Huangpu River divides the city into Pudong and Puxi. The land is very flat, only 2.19 meters above the sea on average, and water is everywhere. The weather is mild and wet with four clear seasons; spring and autumn are best for a visit, when the white magnolia blooms.' },
    { v:3, zh:'别看上海今天这么现代，它的故事其实很长。大约6000年前，今天上海的西部已经变成陆地；一千多年前，这里还只是一个小渔村。1292年上海建县，1843年开埠，走向世界。大家知道上海为什么简称“申”、又叫“沪”吗？“申”来自一位真实人物——约2300年前，贤明的春申君黄歇治理这片土地，带领百姓疏浚大江，江因他得名“春申江”，城市也就简称“申”。“沪”更早，原是先民捕鱼用的一种竹编渔具，江边的小渔村慢慢长大，就成了今天的上海。',
      en:'Modern as it looks, Shanghai has a long story. About 6,000 years ago, western Shanghai was already dry land; a thousand years ago it was just a fishing village. It became a county in 1292 and opened as a trading port in 1843. Do you know why it is called “Shen” and “Hu”? “Shen” comes from a real person: about 2,300 years ago, the wise Lord Chunshen governed this land and deepened the river for the people, so the river took his name — the Chunshen River — and the city became “Shen”. “Hu” is even older: it was a bamboo fishing tool of the early fishermen, and their village grew into today’s Shanghai.' },
    { v:3, zh:'今天，上海面积约6340.5平方公里，下辖16个区，常住人口超过2400万，比许多国家的人口还多。江对岸就是浦东新区：1990年那里还是大片农田，如今高楼直插云霄——这就是上海速度。',
      en:'Today, Shanghai covers about 6,340 square kilometers, has 16 districts and over 24 million people — more than many countries. Across the river lies Pudong New Area: in 1990 it was mostly farmland, and today its towers touch the clouds. That is the speed of Shanghai.' },
    { v:3, zh:'请看上海市标，它由三样东西组成：白玉兰、沙船和螺旋桨。沙船记住港口历史，螺旋桨代表城市永不停步；白玉兰早春先开花、后长叶，象征开路先锋的精神，它也是上海的市花。',
      en:'Look at the city emblem: a white magnolia, a sailing junk and a propeller. The junk remembers our port history, and the propeller means the city never stops. The magnolia blooms before its leaves come out — a pioneer spirit — and is also the city flower.' },
    { v:5, zh:'上海是一座“对照鲜明”的城市：外滩的老建筑与江对岸陆家嘴的现代高楼隔江相望；老城厢的豫园藏着中国古典园林之美；人民广场是城市的政治和文化中心；2016年开园的上海迪士尼度假区，是年轻人和孩子们最爱的地方；朱家角等古镇则保留着慢悠悠的水乡生活。',
      en:'Shanghai is a city of contrasts. The old buildings of the Bund face the modern towers of Lujiazui across the river; Yu Garden in the Old Town keeps the beauty of classical Chinese gardens; People’s Square is the political and cultural heart of the city; and Shanghai Disney Resort, opened in 2016, is the favorite of young people and children. Water towns like Zhujiajiao still keep the slow, soft life of old times.' },
    { v:5, zh:'人们常用“现代、多元、开放、包容”形容上海。来自全国各地、乃至世界各地的人们在这里安家，也带来各自的文化——传统与现代相遇，东方与西方相融。上海的城市精神也很好记：海纳百川、追求卓越、开明睿智、大气谦和；城市品格是开放、创新、包容——在这里，你永远感觉被欢迎。',
      en:'People often describe Shanghai as “modern, diverse, open and inclusive”. People from all over China and the world settle here and bring their own cultures, so the traditional meets the modern, and the East meets the West. The city spirit is easy to remember: welcome everyone, aim for the best, stay wise and open, and be kind and modest. Here, you will always feel welcome.' },
    { v:3, zh:'接下来几天，我会带大家看上海最美的一面——外滩、豫园、陆家嘴，还有更多惊喜。无论你是第一次来，还是常来常往，上海都会给你一点古老、一点崭新、一点与众不同。有任何需要，随时来找我。祝大家在上海度过美好时光，谢谢！',
      en:'In the next few days, I will show you the best of Shanghai — the Bund, Yu Garden, Lujiazui and more. First-time visitor or old friend, Shanghai always offers you something old, something new and something different. If you need anything, come to me. I wish you a wonderful stay. Thank you!' }
  ]
},
/* ---------- 红色文化 ---------- */
{
  id:'ov_red', cat:'culture', score:10,
  title:{ zh:'上海文化旅游概况 · 红色文化', en:'Commentary: Shanghai’s Red Culture' },
  keywords:[
    {zh:'红色文化',en:'red culture'}, {zh:'伟大建党精神',en:'the great founding spirit of the CPC'},
    {zh:'中共一大纪念馆',en:'Memorial of the First CPC National Congress'},
    {zh:'南湖红船',en:'the Red Boat'}, {zh:'初心',en:'the original aspiration'},
    {zh:'红色资源',en:'red sites'}, {zh:'龙华烈士陵园',en:'Longhua Martyrs Cemetery'},
    {zh:'初心之旅',en:'the Original Aspiration Tour'}
  ],
  body:[
    { v:3, zh:'各位游客朋友，欢迎来到上海！我是导游小胡。今天为大家做上海红色文化旅游概况。上海是中国共产党的诞生地，是党的初心始发地。红色文化，就是党和人民在奋斗中留下的旧址、文物和精神财富。我按五个方面介绍：精神内涵、时代价值、资源分布、核心地标和旅游线路。',
      en:'Ladies and gentlemen, welcome to Shanghai! I’m Xiao Hu, your guide. Today’s topic is Shanghai’s red culture. Shanghai is the birthplace of the Communist Party of China, where its original aspiration began. Red culture means the sites, relics and spirit the Party and the people left in their struggle. I will cover five points: spiritual meaning, value today, resources, core landmarks, and a tour route.' },
    { v:3, zh:'第一，精神内涵。2021年，“伟大建党精神”被概括为32个字，记四个要点就行：坚持真理、坚守理想；践行初心、担当使命；不怕牺牲、英勇斗争；对党忠诚、不负人民。它始于1921年7月23日：13位平均年龄只有28岁的代表，在兴业路76号石库门秘密开会；密探闯入后，他们转移到嘉兴南湖的一条游船上开完会议，党就此诞生。这条船就是著名的“红船”——开天辟地、敢为人先。',
      en:'First, the spiritual meaning. In 2021, the great founding spirit of the Party was summed up in 32 Chinese characters, easy to remember in four points: truth and ideals; original aspiration and responsibility; fearless struggle; loyalty to the people. It began on July 23, 1921, when thirteen delegates, only 28 on average, met secretly in a Shikumen house at 76 Xingye Road. After a spy broke in, they finished the meeting on a boat on Nanhu Lake in Jiaxing, and the Party was born. That boat is the famous Red Boat — bold and first in the world.' },
    { v:3, zh:'第二，时代价值。今天国家强大了、人民富裕了，但初心没有变。红色文化提醒我们：有信仰、敢担当、肯奋斗。对年轻人，旧址是生动的课堂；对城市，红色基因让上海始终“敢为天下先”。',
      en:'Second, its value today. The country is strong and people live better, but the original aspiration has never changed. Red culture tells us to keep faith, take responsibility and dare to struggle. For young people these sites are living classrooms; for the city, the red gene keeps Shanghai always first.' },
    { v:3, zh:'第三，资源分布。上海有600多处红色资源：会址、纪念馆、烈士陵园、名人故居，大多在市中心，黄浦、静安、虹口、徐汇最集中。这里的历史很近，可以走进去、摸得到。',
      en:'Third, the resources. Shanghai has over 600 red sites: meeting places, memorial halls, martyrs cemeteries and old homes of famous people. Most are in the city center, mainly in Huangpu, Jing’an, Hongkou and Xuhui. History here is close enough to walk into and touch.' },
    { v:3, zh:'第四，核心地标。最核心的是中共一大纪念馆——石库门会址加2021年开放的新馆；还有中共二大会址纪念馆，党的第一部党章在这里诞生；中共四大纪念馆在虹口；以及龙华烈士陵园。它们串起党在上海的早期足迹。',
      en:'Fourth, the core landmarks. The most important is the Memorial of the First CPC National Congress — the Shikumen site and a new hall opened in 2021. Others are the Second Congress site, where the first Party Constitution was born; the Fourth Congress Memorial in Hongkou; and the Longhua Martyrs Cemetery. Together they show the Party’s early footprints.' },
    { v:5, zh:'如果时间充裕，还可以走一条缅怀线路：龙华烈士陵园—鲁迅纪念馆—李白烈士故居。上海还开通了红色主题巴士，一站一馆，把主要红色场馆串联起来，参观非常方便。',
      en:'With more time, you may choose a memorial route: the Longhua Martyrs Cemetery, the Lu Xun Memorial and the former home of martyr Li Bai. Shanghai also runs a red-themed tourist bus, one museum at each stop, linking the main red halls with great convenience.' },
    { v:3, zh:'最后是一条经典线路，非常好记：中共一大纪念馆—新天地—石库门里弄，叫“初心之旅”。上一分钟看1921年的故事，转角就是咖啡馆和时尚小店，历史与今天只隔一条弄堂。现在，请随我走进中共一大纪念馆。谢谢大家！',
      en:'Finally, a classic route, easy to remember: the First Congress Memorial, Xintiandi and the Shikumen lanes — the “Original Aspiration Tour”. One minute you watch the story of 1921; the next, coffee shops are just around the corner. History and today are only one lane apart. Now please follow me into the memorial. Thank you!' }
  ]
},
/* ---------- 海派文化 ---------- */
{
  id:'ov_haipai', cat:'culture', score:10,
  title:{ zh:'上海文化旅游概况 · 海派文化', en:'Commentary: Haipai Culture' },
  keywords:[
    {zh:'海派文化',en:'Haipai (Shanghai-style) culture'}, {zh:'石库门建筑',en:'Shikumen architecture'},
    {zh:'张爱玲',en:'Eileen Chang'}, {zh:'旗袍',en:'qipao'},
    {zh:'新天地',en:'Xintiandi'}, {zh:'武康大楼',en:'Wukang Mansion'}
  ],
  body:[
    { v:3, zh:'各位游客朋友，欢迎来到上海！我是导游小胡。“海派”，就是上海风格。它是怎么形成的？1843年上海开埠后，中西文化在这里交汇了一百多年。小商埠慢慢长成现代大都市，两种文化也融成一种新东西——开放、创新、包容，这就是海派文化。上海拥抱世界，世界也在这里感到自在。',
      en:'Ladies and gentlemen, welcome to Shanghai! I’m Xiao Hu, your local guide. “Haipai” means the Shanghai style. How did it begin? After Shanghai opened as a port in 1843, Chinese and Western cultures met here for over a hundred years. The small trading town slowly grew into a great modern city, and the two cultures mixed into something new — open, creative and welcoming. That is Haipai culture. Shanghai welcomes the world, and the world feels at home here.' },
    { v:3, zh:'最有代表性的是石库门。它诞生于19世纪60年代，把江南民居与西方联排住宅融在一起：石门框、小天井、热闹的弄堂。今天的新天地、田子坊让老房子焕发新生：历史可以走进去、逛起来，甚至住进去。中共一大会址，就是一座典型的石库门。',
      en:'The best symbol is Shikumen, the old stone-gate houses born in the 1860s. They mix Jiangnan homes with Western row houses: a stone gate, a small courtyard and a busy lane. Today, Xintiandi and Tianzifang give these old houses new life. You can walk into history, eat, shop, and even live there. The First CPC Congress was also held in a Shikumen house.' },
    { v:3, zh:'海派文化资源遍布全城：外滩的老房子来自不同国家，像一座“万国建筑博览会”；武康路一带梧桐成荫，老洋房、小剧场、书店和咖啡馆藏在街边；博物馆、美术馆、音乐厅也随处可见。整座城市，就像一个开放的大展馆。',
      en:'Haipai resources are spread all over the city. On the Bund, old buildings from many countries stand like a world architecture fair. On tree-lined streets such as Wukang Road, old villas, small theaters, bookstores and cafes hide along the way. Museums, art galleries and concert halls are also everywhere. The whole city is like one open exhibition.' },
    { v:3, zh:'讲一个海派生活的真实故事。上世纪二三十年代，上海被称为“东方巴黎”：爵士乐悠扬，摩登女郎身穿改良旗袍，城市处处是新鲜事物。上世纪40年代，一位穿旗袍的年轻女子，在南京西路附近的一栋公寓里写这座城市的爱情故事。她叫张爱玲，中国现代最优秀的作家之一。她说“出名要趁早”——这句话，很像这座快节奏、有自信的城市。',
      en:'Here is a true story of Haipai life. In the 1920s and 1930s, Shanghai was called the “Paris of the East”. Jazz played, stylish ladies wore the modern qipao, and the city was full of new things. In the 1940s, a young woman in a qipao wrote love stories about this city in an apartment near West Nanjing Road. Her name was Eileen Chang, one of the finest writers of modern China. She said, “Fame should come early” — words that sound just like this fast, confident city.' },
    { v:5, zh:'海派生活今天依然鲜活：上海的咖啡馆数量居世界第一；人们在书店里阅读，周末去武康路散步，在百年老建筑里听音乐会。新与旧，就这样自然、舒服地肩并肩。',
      en:'Haipai life is still alive today. Shanghai has more coffee shops than any other city in the world. People read in bookstores, walk along Wukang Road at weekends, and listen to concerts in hundred-year-old buildings. Old and new sit side by side, naturally and comfortably.' },
    { v:3, zh:'一条经典的海派线路很好记：外滩—新天地—武康大楼。慢慢走、抬头看，你是在用石头阅读上海的历史。晚上，和平饭店的老年爵士乐队仍在演出——就像八十年前一样。祝大家漫步愉快，谢谢！',
      en:'A classic Haipai route is easy to remember: the Bund, Xintiandi and the Wukang Mansion. Walk slowly, look up at the buildings, and you will read Shanghai’s story in stone. At night, the old jazz band at the Peace Hotel still plays — just as it did 80 years ago. Enjoy your walk. Thank you!' }
  ]
},
/* ---------- 江南文化 ---------- */
{
  id:'ov_jiangnan', cat:'culture', score:10,
  title:{ zh:'上海文化旅游概况 · 江南文化', en:'Commentary: Jiangnan Culture' },
  keywords:[
    {zh:'江南文化',en:'Jiangnan culture'}, {zh:'水乡古镇',en:'ancient water town'},
    {zh:'古典园林',en:'classical garden'}, {zh:'玉玲珑',en:'the Jade Exquisite'},
    {zh:'朱家角',en:'Zhujiajiao'}, {zh:'董其昌',en:'Dong Qichang'}
  ],
  body:[
    { v:3, zh:'各位游客朋友，欢迎来到上海！我是导游小胡。上海很现代，但它的根深扎在江南——长江以南、河湖密布的水乡之地。早在城市长大之前，河网、舟船和稻田就在这里孕育出精细、温柔又务实的江南文化；这里的人们，一直喜欢美食、精舍和安静美好的生活。',
      en:'Ladies and gentlemen, welcome to Shanghai! I’m Xiao Hu, your local guide. Shanghai looks modern, but its roots grow deep in Jiangnan — the land south of the Yangtze River, full of rivers and lakes. Long before the city grew, waterways, boats and rice fields gave birth to a culture that is fine, gentle and practical. Its people have always loved good food, fine homes and a quiet and beautiful life.' },
    { v:3, zh:'古典园林是了解江南文化最好的窗口。豫园始建于1559年，是明代官员潘允端为让父母安享晚年而建——“豫”就是平安喜悦，园子前前后后修了约十八年。园中的灵石“玉玲珑”有72个孔，据说在石底点一炉香，青烟会从每个孔里轻轻冒出。园子不大，但每块石头、每扇窗都有故事。',
      en:'Classical gardens are the best window into Jiangnan culture. Yu Garden was first built in 1559 by Pan Yunduan, an official of the Ming Dynasty, to bring joy to his old parents — “Yu” means peace and joy, and the work took about 18 years. Inside stands the Jade Exquisite, a strange and beautiful stone with 72 holes. People say if you burn incense at its foot, soft smoke rises from every hole. The garden is small, but every stone and window tells a story.' },
    { v:3, zh:'城市外围，古镇保留着江南旧景：小桥、流水、人家。朱家角的放生桥建于明代，五孔联拱，至今仍是上海地区最大的古石拱桥。临河茶馆飘着茶香，小船从桥下缓缓摇过。',
      en:'Outside the city center, old water towns keep the classic Jiangnan picture: small bridges, running water and homes by the river. In Zhujiajiao, the Fangsheng Bridge was built in the Ming Dynasty. With five arches, it is still the largest old stone arch bridge in the Shanghai area. Tea houses stand by the water, and small boats pass slowly under the bridge.' },
    { v:3, zh:'江南还走出了了不起的文学艺术大家。明代大书画家董其昌，就出生在上海松江。他的山水画安静、清淡，书法也极美，提出的绘画理论影响了中国画坛几百年。今天，在上海博物馆就能看到他的真迹。这片水乡的寻常日子，就这样被写成诗、画成画。',
      en:'Jiangnan also gave birth to great masters of art and writing. Dong Qichang, one of the greatest painters and calligraphers of the Ming Dynasty, was born right here in Songjiang, Shanghai. His landscape paintings are quiet and soft, his brush writing is beautiful, and his ideas about painting changed Chinese art for hundreds of years. Today you can see his real works in the Shanghai Museum. Even the everyday life of this water land was written into poems and painted into pictures.' },
    { v:5, zh:'江南文化也活在非遗传承里。南翔小笼1871年诞生于南翔古镇：皮薄、汤多、汁鲜，真正的老师傅能给每个小笼包捏出18个以上的褶。明代顾绣精细得像用针画的画，沪剧还在用软糯的乡音唱着上海人的日常。',
      en:'Jiangnan culture also lives on in its heritage. Nanxiang steamed buns were born in 1871 in Nanxiang Old Town: thin skin, rich soup and fresh juice, and a master makes more than 18 folds on each little bun. Gu embroidery from the Ming Dynasty is so fine that it looks like a painting made with a needle, and Huju opera still sings daily life in the soft local voice.' },
    { v:3, zh:'一条经典的江南一日线路：上午逛豫园，下午游朱家角。跨过一座古桥，尝一只热腾腾的小笼包，你就会感受到——都市里的江南。谢谢大家，祝大家享受慢生活！',
      en:'A classic one-day Jiangnan route is easy: Yu Garden in the morning, and Zhujiajiao Old Town in the afternoon. Cross an old stone bridge and taste a hot steamed bun, and you will feel it — Jiangnan right inside the modern city. Thank you, and enjoy the slow life!' }
  ]
}
];
