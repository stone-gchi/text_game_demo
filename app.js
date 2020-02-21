const textElement = document.querySelector('#text');
const optionsButtonElement = document.querySelector('#options-buttons');
const imageElement = document.querySelector("#image");
const sourceElement = document.querySelector("#sourceName");

let state = {};

function startGame() {
	state = {};
	showTextNode(1)
}

function showTextNode(textNodeIndex) {
  const textNode = textNodes.find(textNode => textNode.id === textNodeIndex);
	textElement.innerText = textNode.text;
	imageElement.src = textNode.image;
	sourceElement.innerHTML = textNode.source;

	while (optionsButtonElement.firstChild) {
		optionsButtonElement.removeChild(optionsButtonElement.firstChild);
	}

	textNode.options.forEach(option => {
		if (showOption(option)) {
			const button = document.createElement('button');
			button.innerText = option.text;
			button.classList.add('btn');
			button.addEventListener ('click', () => selectOption(option));
			optionsButtonElement.appendChild(button);
		}
	})
}

function showOption(option) {
  return option.requiredState == null || option.requiredState(state);
}

function selectOption(option) {
 const nextTextNodeId = option.nextText;
 	if(nextTextNodeId <= 0){
		 startGame();
	 }
	state = Object.assign (state, option.setState);
	showTextNode(nextTextNodeId);
}

const textNodes = [
	{
		id: 1,
		image:
			'https://tl.hkrev.info/wp-content/uploads/2019/08/BG-%E8%87%AA%E7%94%B1%E6%99%82%E5%A0%B1-1.jpg',
		source: '自由時報',
		text:
			'2019年6月12日 黑警使用多枚催淚彈包夾走投無路的示威者，令過百名的示威者只能通過一道旋轉玻璃門逃生。你是其中一名示威者，你唔明點解一個申請左不反對通知書既區域，會差點造成人踩人慘劇。\n\n平安回家後，你知道政府沒有回應訴求，更形容事件為「暴動」',
		options: [
			{
				text: '好驚呀！再遊行？不了',
				setState: {},
				nextText: 2
			},
			{
				text: '堅持落去，會再遊行，以和理非方式爭取公義！',
				setState: { continue: true },
				nextText: 2
			},
			{
				text: '不能接受警暴，除了和理非方式，或許有其他出路',
				setState: { continue: true },
				nextText: 2
			},
			{
				text: '勇武是唯一出路',
				setState: { continue: true },
				nextText: 2
			}
		]
	},
	{
		id: 2,
		image:
			'https://tl.hkrev.info/wp-content/uploads/2019/08/BG-%E7%AB%AF%E9%BB%9E.jpg',
		source: '端傳媒',
		text:
			'2019年6月16日 即行政長官林鄭月娥宣布暫緩修例翌日，民陣再次舉行遊行。民陣提出五大要求：撤回修訂逃犯條例、不檢控示威者、追究警方開槍責任、不將示威行動定性為暴動，以及行政長官林鄭月娥下台。有人亦響應呼籲帶備白色鮮花或紙花，向前一日抗議時墮樓身亡的梁凌杰致意。\n\n你今日出門口前會準備d咩？',
		options: [
			{
				text: '只穿黑衫黑褲，水',
				requiredState: currentState => currentState.continue,
				nextText: 3
			},
			{
				text: '黑衫黑褲，水，雨傘，鮮花，文宣',
				requiredState: currentState => currentState.continue,
				nextText: 3
			},
			{
				text: '黑衫黑褲，水，雨傘，鮮花，文宣, 頭盔，保鮮紙',
				requiredState: currentState => currentState.continue,
				nextText: 3
			},
			{
				text: '黑衫黑褲，水，雨傘，鮮花，文宣, 頭盔，保鮮紙，有需要時會上前線',
				requiredState: currentState => currentState.continue,
				nextText: 3
			},
			{
				text: '遊行？不了',
				nextText: 101
			}
		]
	},
	{
		id: 3,
		image: 'https://tl.hkrev.info/wp-content/uploads/2019/08/BG-nowtv.jpg',
		source: 'NowTV',
		text:
			'2019年6月21日 最高大專學界向行政長官發出最後通牒屆滿，並未獲回應宣佈升級，由於政府總部關閉，故發起包圍警察總部。\n\n你決定：',
		options: [
			{
				text: '去',
				nextText: 4
			},
			{
				text: '唔去',
				nextText: 9
			}
		]
	},
	{
		id: 4,
		image: 'https://cdn2.ettoday.net/images/4182/4182784.jpg',
		source: '香港大學學生會校園電視',
		text:
			'到了現場後，萬人包圍灣仔警察總部已逾12小時，軍器廠街、夏慤道一帶站滿示威者，而警總所有出入口被圍封，人車不得進出。\n\n你決定：',
		options: [
			{
				text: '目標已達成，先回家，再部署。',
				nextText: 6
			},
			{
				text: '先換裝，再找機會設置路障',
				nextText: 5
			},
			{
				text: '先換裝，但始終好驚，只能幫手足開傘',
				nextText: 5
			},
			{
				text: '投擲雞蛋，傷害唔高，應該唔怕',
				setState: { danger: true },
				nextText: 5
			},
			{
				text: '唔換裝照噴CAM，驚咩',
				setState: { danger: true },
				nextText: 5
			}
		]
	},
	{
		id: 5,
		image: '',
		source: '-',
		text:
			'到了深夜，你決定回家。你落巴士既時候，發現有人好似跟蹤緊你，但你唔肯定佢係手足定係狗。',
		options: [
			{
				text: '行快兩步',
				nextText: 6
			},
			{
				text: '去人多既地方，再轉車去另一區試圖擺脫',
				requiredState: currentState => !currentState.danger,
				nextText: 8
			},
			{
				text: '可能係手足。有手足，唔怕！',
				nextText: 6
			},
			{
				text: '如果佢主動埋黎傾，就同佢分享頭先發生既事',
				nextText: 6
			}
		]
	},
	{
		id: 6,
		image: '',
		source: '-',
		text: '神秘人："喂，手足，你住邊架？不如交換tg組隊？"\n\n你會：',
		options: [
			{
				text: '交換tg',
				nextText: 7
			},
			{
				text: '"唔知你講乜"（我冇野講）',
				nextText: 8
			}
		]
	},
	{
		id: 7,
		image: '',
		source: '-',
		text: '明天早上，你被上門拘捕了。原來尋晚跟蹤你係便衣狗。',
		options: [
			{
				text: '從新開始',
				nextText: -1
			}
		]
	},
	{
		id: 8,
		image: '',
		source: '-',
		text: '便衣狗跟蹤失敗，你逃過一劫。',
		options: [
			{
				text: '繼續',
				nextText: 9
			}
		]
	},
	{
		id: 9,
		image:
			'https://d32kak7w9u5ewj.cloudfront.net/media/image/2019/07/565188ee134a4c52a424e4f713fc470a.jpg?imageView2/1/w/1080/h/720/format/jpg',
		source: '端傳媒',
		text:
			'7月1日下午1時半左右，一批示威者開始衝撃立法會大樓，以鐵通及載有廢紙的鐵籠車，不斷撞擊立法會玻璃門，期間多名民主派立法會議員阻止。\n\n你決定：',
		options: [
			{
				text: '加入，要攻入立法會（被記者影到）',
				nextText: 10
			},
			{
				text: '和理非，太暴力，畫面唔好睇。',
				nextText: 100
			},
			{
				text: '和理非，要養家，身不由己。',
				nextText: 99
			},
			{
				text: '攬低白頭佬',
				nextText: 10
			}
		]
	},
	{
		id: 10,
		image:
			'https://tl.hkrev.info/wp-content/uploads/2019/08/BG-%E7%AB%AF%E9%BB%9E.jpeg',
		source: '端傳媒',
		text:
			'進入大樓後，示威者除了四處噴漆寫上抗議字句，之後在會議廳內讀出《香港人抗爭宣言》結尾的五大訴求，包括撤回修例、收回暴動定義、撤銷反送中抗爭者控罪、徹底追究警隊濫權情況、2020年立法會普選。他們又指「反送中運動」發展至今，在三位年輕市民「殉道」，不願香港再有為民主、為自由、為公義再添亡魂，希望社會大眾團結一致，對抗惡法，對抗暴政，共同守護香港。警方於10時許表示將於短時間內清場，如遇阻礙或反抗，將採取適當武力。示威者陸續離開大樓，截至11時只有數名示威者留下，至凌晨零時許已全部離開。是次佔領立法會，被視為令整場運動曠日持久的一個轉捩點。\n\n呢刻你知道返唔到轉頭，朋友亦提醒你有被捕危險。你會：',
		options: [
			{
				text: '搭飛機離開香港',
				nextText: 11
			},
			{
				text: '留港面對白色恐怖',
				nextText: 12
			}
		]
	},
	{
		id: 11,
		image: 'https://i.lih.kg/540/https://na.cx/i/1PgNeKT.jpg',
		source: 'lihkg',
		text:
			'你最後去左台灣，同所有親友斷絕來往。期望有一日光復香港，之後你就可以返去呢個地方\n\n手足，多謝你。(完)',
		options: [
			{
				text: 'restart',
				nextText: -1
			}
		]
	},
	{
		id: 12,
		image: '',
		source: '-',
		text: '手足，多謝你為香港做左咁多野。好人有好報\n\n（完）',
		options: [
			{
				text: 'restart',
				nextText: -1
			}
		]
	},
	{
		id: 99,
		image: '',
		source: '-',
		text:
			'你返到屋企，睇live見到好多手足冒住坐10年既危險衝左入去。你喊左出黎，你好嬲自己幫唔到佢地，。\n\n呢個時候，你下定決心，即使冇能力上前線，都要堅持做文宣為光復香港出一分力\n\n(完)',
		options: [
			{
				text: 'restart ?',
				nextText: -1
			}
		]
	},
	{
		id: 100,
		image: '',
		source: '-',
		text:
			'你返到屋企，睇live見到好多手足冒住坐10年既危險衝左入去。你唔明，你覺得遊行係應該和理非，政府坐視唔理之下，咁又可以點。\n\n呢個時候，你開始考慮，早兩日去移民公司拎的既plan...\n\n(完)',
		options: [
			{
				text: 'restart ?',
				nextText: -1
			}
		]
	},
	{
		id: 101,
		image: '',
		source: '-',
		text: '香港人，反抗！希望有一日，你都會明白。\n\n(完)',
		options: [
			{
				text: 'restart',
				nextText: -1
			}
		]
	}
];

startGame()
