/* ============================================================
 * M4 导游服务规范与应变能力
 * norms：服务规范（中文步骤常显 + 英文应答/讲解模板）
 * emergencies：特殊问题处理情景（处理步骤 + 英文话术模板）
 * ============================================================ */

XH.normGroups = [
  { id:'proc', name:'服务程序' },
  { id:'skill', name:'讲解方法' },
  { id:'team', name:'团队接待' },
  { id:'coop', name:'合作规范' }
];

XH.norms = [
{ id:'nm_local', group:'proc', score:10,
  title:{ zh:'地陪导游服务程序（八大环节）', en:'Local Guide Service Procedure' },
  steps:[
    '服务准备：熟悉接待计划，落实住宿、用餐、车辆与行李事宜',
    '接站服务：提前30分钟抵达接站点，认找团队，核实人数与行李',
    '入店服务：协助办理入住、宣布用餐与集合安排、照顾行李进房',
    '核对商定日程：与领队、全陪核对行程，必要时通知接待社',
    '参观游览：出发前讲清当日安排，游览中“导”与“游”结合、注意安全',
    '其他服务：餐饮、购物、文娱、自由活动等按计划提供并提醒注意事项',
    '送站服务：提前到达机场车站，协助办理手续，致欢送词',
    '善后工作：结清账目、归还物品、处理遗留问题、写好陪同小结'
  ],
  en:'Ladies and gentlemen, welcome to Shanghai! I’m your local guide, and I’ll be with you throughout your stay. This morning we’ll visit the Bund, and after lunch we’ll head to Yu Garden. Please keep your valuables with you, remember our bus number, and follow the red flag. If you have any special needs — meals, medicine or anything else — just let me know anytime. I wish you all a pleasant trip!' },
{ id:'nm_full', group:'proc',
  title:{ zh:'全陪导游服务程序', en:'National Escort Service Procedure' },
  steps:[
    '准备阶段：熟悉全程计划，与各地接社联系衔接',
    '首站接团：致欢迎词、介绍全程安排与注意事项',
    '途中与各站：监督各地接待质量，协调上下站衔接',
    '各站服务：协助地陪工作，维护游客人身与财物安全',
    '末站送团：致欢送词，征求意见，处理送别事宜',
    '善后：报账、归还物品、提交陪同日志'
  ],
  en:'Welcome aboard, everyone! I’m your national escort for this whole journey. My job is to make sure every city runs smoothly for you. Wherever we go, please stay with the group, keep my phone number, and don’t hesitate to tell me if anything is not to your satisfaction. Let’s have a wonderful trip together!' },
{ id:'nm_leader', group:'proc',
  title:{ zh:'领队服务程序与职责', en:'Outbound Tour Leader’s Duties' },
  steps:[
    '行前：开说明会，核对证件签证，告知集合时间与禁忌',
    '出入境：带领团队办理通关，保管好团队名单与必要文件',
    '境外：代表游客与当地导游、酒店沟通，监督接待质量',
    '安全：维护团队秩序，处理证件、财物、伤病等突发问题',
    '归国：清点人数、办理入境，组织总结并归还证件'
  ],
  en:'Good morning, team! I’m your tour leader. Please follow me through immigration and keep your passport ready. During the trip, I’ll be your bridge with the local guide and hotels. Please remember: never leave the group without telling me, and keep a photocopy of your passport separately. Have a safe and enjoyable trip!' },
{ id:'nm_method', group:'skill',
  title:{ zh:'导游常用讲解方法', en:'Common Commentary Techniques' },
  steps:[
    '分段讲解法：按游览顺序分段介绍，层层递进',
    '突出重点法：突出景点的独特之处（最大、最早、唯一）',
    '虚实结合法：历史史实与民间传说穿插进行',
    '问答法：自问自答或我问客答，增强参与感',
    '制造悬念法：先“卖关子”再揭晓，吸引注意力',
    '类比法：用游客熟悉的事物作类比，便于理解'
  ],
  en:'Now, before we go in, let me ask you a question: can you guess how old this garden is? … It’s over four hundred years old! To help you picture it: when the British built their first settlement here, Yu Garden had already been standing for nearly 300 years.' },
{ id:'nm_child', group:'team',
  title:{ zh:'亲子团接待技巧', en:'Receiving Family Tours' },
  steps:[
    '节奏放慢、行程宽松，安排互动性强的项目',
    '反复强调安全：水边、高处、走散后的集合点',
    '讲解多用故事、提问和比喻，兼顾儿童兴趣',
    '提醒家长照护责任，备常用药与急救联系方式'
  ],
  en:'Hello kids, and welcome! Today we’re going on a treasure hunt in a very old garden. Who can be the first to find the dragon on the wall? Parents, please hold your children’s hands near the ponds, and let’s meet at the big rockery in 20 minutes.' },
{ id:'nm_senior', group:'team',
  title:{ zh:'老年团接待技巧', en:'Receiving Senior Tours' },
  steps:[
    '行程“少而精”，多休息、慢节奏，避开拥挤时段',
    '关注健康：备好急救药信息，提醒按时服药',
    '讲解语速放慢、声音洪亮、重复重点',
    '饮食住宿提前关照：软食、低楼层、近电梯'
  ],
  en:'Good morning, everyone! Please take your time — we have no rush today. There are benches along the way whenever you’d like to rest. If you feel tired or unwell at any point, just raise your hand and I’ll come to you right away.' },
{ id:'nm_biz', group:'team',
  title:{ zh:'商务团 / 政务团接待技巧', en:'Receiving Business & VIP Delegations' },
  steps:[
    '行前充分了解团组级别、日程、禁忌与礼宾规格',
    '守时精准：提前踩点，预留缓冲时间',
    '讲解规范简洁，数据准确，突出城市经济与开放成果',
    '仪容仪表端庄，注意保密，不随意拍照发布'
  ],
  en:'Distinguished guests, good morning and welcome to Shanghai. According to your schedule, we’ll begin with a 20-minute briefing on Lujiazui, followed by a site visit. I’ll keep the introduction concise, and please feel free to interrupt with questions at any time.' },
{ id:'nm_study', group:'team',
  title:{ zh:'研学团 / 残障团接待要点', en:'Study Tours & Accessible Tours' },
  steps:[
    '研学团：设计任务单，讲解“知识+体验”，配学习手册',
    '残障团：提前确认无障碍设施、轮椅通道与专用车位',
    '残障团：安排耐心细致的服务人员，尊重为先、不围观不议论',
    '所有特殊团队均须与接待单位提前确认应急预案'
  ],
  en:'Welcome, students! Here is today’s mission sheet: each group needs to find three stories in the garden and present one in English before we leave. — For guests with wheelchairs, we have a step-free route on the east side; please follow me and I’ll show you the accessible elevators.' },
{ id:'nm_coop', group:'coop',
  title:{ zh:'导游与领队、司机、接待单位的合作规范', en:'Cooperation with Leaders, Drivers & Suppliers' },
  steps:[
    '尊重领队职权，遇事多协商，维护领队在游客前的威信',
    '与司机合作：提前沟通行程、停车点与作息，安全第一',
    '与酒店、餐厅、景区等接待单位：按合同履约，变更留书面凭证',
    '发生问题分清责任，及时向旅行社汇报，不越权承诺'
  ],
  en:'Mr. Leader, shall we confirm tomorrow’s departure time with the driver now? — Excuse me, Captain, we have 32 guests today; could we park near Gate 2? Thank you so much for your support.' }
];

XH.emergencies = [
{ id:'em_lostcert', cat:'证件丢失',
  title:{ zh:'游客证件丢失', en:'A Tourist Loses His/Her Certificate' },
  steps:['安抚游客情绪，请其冷静回忆','协助回忆最后使用证件的地点，原路寻找','立即报告旅行社，陪同到派出所开具报案证明','协助办理补办手续（护照→出入境管理部门；身份证→当地派出所）','调整后续行程，预留补办时间'],
  en:'I’m very sorry to hear that, Mr./Ms. ___. Please don’t worry — such problems can be solved. First, let’s calmly retrace your steps to see where you might have left it. Meanwhile, I will report to my travel agency right away and accompany you to the local police station to get the certificate replaced as soon as possible. I’m afraid we may need to adjust today’s schedule slightly. Is that all right with you?' },
{ id:'em_miss', cat:'漏接错接',
  title:{ zh:'漏接旅游团', en:'Missing the Group on Arrival' },
  steps:['第一时间向旅行社与领队核实团组抵达信息','尽快赶赴现场或安排车辆接站','诚恳致歉，不推卸责任','加位补偿服务（加讲解、送小纪念品），安抚情绪','事后写事故报告，分析原因'],
  en:'Dear guests, I sincerely apologize for keeping you waiting. The delay was entirely on our side. To make up for it, I’ve prepared cold water and small gifts for everyone, and I’ll add a special viewpoint to tonight’s tour. Please accept my sincere apology, and thank you for your understanding.' },
{ id:'em_plane', cat:'误机车船',
  title:{ zh:'游客可能误机（车、船）', en:'Risk of Missing the Flight' },
  steps:['立即与机场/车站确认最晚办票时间','报告旅行社，请求协调后续航班或改签','稳定团队情绪，安排专人陪同迟到游客','其余游客按原计划送站','产生费用按责任划分，保留凭证'],
  en:'Everyone, please don’t panic. We still have a chance, but we must move quickly. Please take your hand luggage and follow me to the check-in counter right now. I’ve informed the airline, and two colleagues are helping us at the counter. For those who may miss the flight, our agency has already started arranging the next available flight.' },
{ id:'em_lostperson', cat:'游客走失',
  title:{ zh:'游览中游客走失', en:'A Tourist Goes Missing' },
  steps:['了解情况：最后见到的时间、地点、衣着特征','地陪带队继续游览，全陪/领队分头寻找','景区广播寻人，调取监控','必要时报旅行社与公安部门','找到后不指责，事后总结提醒'],
  en:'Attention, please. We are looking for Mr. ___, wearing a blue jacket and a white cap. If you hear this announcement, please come to the main entrance, where your guide is waiting. Mr. ___’s family is already there. Thank you for your cooperation.' },
{ id:'em_lostmoney', cat:'钱物丢失',
  title:{ zh:'游客钱物行李丢失', en:'Lost Money or Luggage' },
  steps:['稳定情绪，问清物品特征与丢失经过','在酒店、餐厅、车上逐一排查联系','报告旅行社与相关场所安保部门','被盗则陪同报警，取得报案证明','协助开具保险理赔所需证明'],
  en:'I’m sorry this happened. Let’s make a clear list of the missing items first, including the brand and color of the bag. I’ll call the hotel and the restaurant immediately — many lost items are kept at the front desk. If it was stolen, I’ll accompany you to the police station, because the police report is also needed for your insurance claim.' },
{ id:'em_sick', cat:'游客患病',
  title:{ zh:'游客突发疾病', en:'A Tourist Falls Ill' },
  steps:['就地观察病情，让患者休息，勿随意给药','报告旅行社，拨打120送就近医院','领队/家属或亲友陪同就医，保存病历与票据','必要时办理分离签证、延期与陪护安排','患者未愈不得继续随团，做好安抚'],
  en:'Please stay calm and give him some air. I’ve called 120, and the ambulance is on its way. Is there anyone traveling with him? Please bring his passport and insurance documents. Sir, please don’t worry about the tour — your health comes first; we’ll take care of everything else.' },
{ id:'em_accident', cat:'安全事故',
  title:{ zh:'发生交通/治安安全事故', en:'Traffic or Security Accidents' },
  steps:['组织抢救伤员，保护现场，拨打110/120/122','立即报告旅行社及有关部门','稳定其他游客，安排继续行程或临时安置','协助事故调查，做好取证（照片、证人）','妥善处理理赔与善后，持续通报进展'],
  en:'Everyone, please remain seated and calm. No one is seriously injured. The police and an ambulance have been called and are arriving. Please make sure you have your belongings, and if anyone feels pain anywhere, tell me now so the doctors can check you. Your safety is our absolute priority.' },
{ id:'em_quit', cat:'要求退团',
  title:{ zh:'游客要求中途退团或亲友随团', en:'Quitting Mid-trip / Friends Joining the Group' },
  steps:['问清原因，配合领队做好说服工作','劝说无效：报告组团社，按合同办理离团手续，未享受费用按规定处理','亲友随团：先征得领队和全团同意','查验证件、办理入团手续并补交费用','外籍亲友随团须经旅行社同意并办妥相关手续'],
  en:'I understand you’d like to return early for personal reasons. I respect your decision. Please wait a moment while I contact our agency to go through the formalities with you, so that the unused portion of the tour cost can be handled properly according to our contract. As for your friend joining us, we’d love to have him, but I first need to confirm with the agency and complete the registration form.' },
{ id:'em_planchg', cat:'计划变更',
  title:{ zh:'旅游计划变更', en:'Itinerary Changes' },
  steps:['分清原因：不可抗力（台风、大雾、疫情等）或客观原因（交通、接待问题）','报告旅行社，请示处理意见，提出等价替代方案（同类景点替换）','向全团如实说明情况，诚恳解释、耐心安抚，争取游客理解同意','与领队、全陪、司机及接待单位逐项衔接变更：车、餐、房、票','按新行程落实服务标准不降低，做好变更记录与事故报告'],
  en:'Ladies and gentlemen, may I have your attention, please? Due to the heavy fog this morning, the river cruise has been suspended, so we have to adjust today’s plan. Instead, we will visit the Shanghai Urban Planning Exhibition Center and the Aquarium — both are wonderful indoor attractions. Our agency has already rearranged the bus, meals and tickets for us. We are very sorry for the inconvenience, and we truly appreciate your understanding and cooperation.' },
{ id:'em_late', cat:'游客迟到',
  title:{ zh:'游客集合迟到', en:'A Tourist Arrives Late' },
  steps:['预防为主：出发前反复强调集合时间、地点与车号，提醒预留时间','准时到达后游客未归：立即电话联系游客本人','全陪、领队分头寻找，询问同行游客与景区工作人员，必要时广播寻人','等待期间安抚全团情绪，适时压缩后续自由活动时间补齐行程','找到后善意提醒、不当众指责；多次迟到者单独沟通并重申团规'],
  en:'Everyone, we planned to depart at two thirty, but one of our guests hasn’t arrived yet. I’ve called him and he is on his way — just five minutes away. Please stay on the bus and enjoy the air conditioning. If he is not back by a quarter to three, we will ask the scenic area to make an announcement. Thank you for your patience and understanding.' },
{ id:'em_personal', cat:'个性化要求',
  title:{ zh:'游客个性化要求处理（餐宿行游购娱）', en:'Handling Personalized Requests' },
  steps:['总原则：合理且可能的尽力满足；无法满足的耐心解释，不冷落、不强求','餐饮：素食、清真、过敏忌口——提前告知餐厅单独安排','住宿：换房、同楼层、无障碍房——与酒店协商，费用按合同处理','购物、文娱及自由活动：计划外项目报告旅行社后协助安排，提醒安全与集合时间','延长旅游：协助续住、改签与证件延期，费用自理，妥善做好离团衔接'],
  en:'Certainly, Mr. Smith. I understand you are a vegetarian and would like a quiet room away from the elevator. Let me confirm with the restaurant and the front desk right away — we will arrange vegetarian meals for every dinner, and the hotel will move you to a quieter room at no extra charge if one is available. For tomorrow’s free afternoon, I can also book a half-day Huangpu River cruise for you as an optional program. Just let me know your decision by tonight.' }
];
