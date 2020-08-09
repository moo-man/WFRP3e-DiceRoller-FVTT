Hooks.on("ready", () => {
	CONFIG.Dice.terms["e"] = ExpertiseDie
	CONFIG.Dice.terms["f"] = FortuneDie
	CONFIG.Dice.terms["m"] = MisfortuneDie
	CONFIG.Dice.terms["c"] = ChallengeDie
	CONFIG.Dice.terms["r"] = CharacteristicDie
	CONFIG.Dice.terms["v"] = ConservativeDie
	CONFIG.Dice.terms["k"] = RecklessDie
})

Hooks.on('renderChatLog', (log, html, data) => {

	html.find(".roll-type-select").click(ev => {
	   let cl = new WFRP3eRoller();
	   cl.render(true);
	})
  
	html.find(".roll-type-select").mouseover(ev => {
	  $(ev.currentTarget).attr("title", "WFRP3e Dice Roller")
   })
})
  

class WFRP3eDie extends DiceTerm {

      /** @override */
	  roll(options) {
		const roll = super.roll(options);
		roll.label = this.constructor.getResultLabel(roll.result);
		roll.resultValue = WFRP3eRoll.diceValues[roll.label] || {};
        return roll;
	}
	
	evaluate (options)
	{
		let result = super.evaluate(options);
		this.termValue(options);
		return result;
	}

	termValue(options)
	{
		this.termResultValues = {}
		this.results.forEach(result => {
			for(let resultType in result.resultValue)
			{
				if (!this.termResultValues[resultType])
					this.termResultValues[resultType] = result.resultValue[resultType]
				else
					this.termResultValues[resultType] += result.resultValue[resultType]
			}
		})
	}

}

class ExpertiseDie extends WFRP3eDie {
	constructor(termData) {
		super(termData) 
		this.faces = 6;
	}

	static DENOMINATION= "e"


	static getResultLabel(result) {
		return {
			"1":"S",
			"2":"RS",
			"3":"B",
			"4":"B",
			"5":"C",
			"6":"&nbsp",
		}[result]
	}

	static getResultClass(result) {
		return "rolled-" + {
			"1":"success",
			"2":"righteous-success",
			"3":"boon",
			"4":"boon",
			"5":"comet",
			"6":"blank",
		}[result]
	}
}

class FortuneDie extends WFRP3eDie {
	constructor(termData) {
		super(termData) 
		this.faces = 6;
	}

	static DENOMINATION= "f"
    

	static getResultLabel(result) {
		return {
			"1":"&nbsp",
			"2":"&nbsp",
			"3":"&nbsp",
			"4":"B",
			"5":"S",
			"6":"S",
		}[result]
	}

	static getResultClass(result) {
		return {
			"1":"rolled-blank",
			"2":"rolled-blank",
			"3":"rolled-blank",
			"4":"rolled-boon",
			"5":"rolled-success",
			"6":"rolled-success",
		}[result]
	}
}

class MisfortuneDie extends WFRP3eDie {
	constructor(termData) {
		super(termData) 
		this.faces = 6;
	}

	static DENOMINATION= "m"

	static getResultLabel(result) {
		return {
			"1":"BN",
			"2":"&nbsp",
			"3":"&nbsp",
			"4":"&nbsp",
			"5":"Ch",
			"6":"Ch",
		}[result]
	}

	static getResultClass(result) {
		return {
			"1":"rolled-bane",
			"2":"rolled-blank",
			"3":"rolled-blank",
			"4":"rolled-blank",
			"5":"rolled-challenge",
			"6":"rolled-challenge",
		}[result]
	}
}

class CharacteristicDie extends WFRP3eDie {
	constructor(termData) {
		super(termData) 
		this.faces = 8;
	}

	static DENOMINATION = "r"

	static getResultLabel(result) {
		return {
			"1":"&nbsp",
			"2":"&nbsp",
			"3":"B",
			"4":"B",
			"5":"S",
			"6":"S",
			"7":"S",
			"8":"S",
		}[result]
	}

	static getResultClass(result) {
		return "rolled-" + {
			"1":"blank",
			"2":"blank",
			"3":"boon",
			"4":"boon",
			"5":"success",
			"6":"success",
			"7":"success",
			"8":"success",
		}[result]
	}
}

class ChallengeDie extends WFRP3eDie {
	constructor(termData) {
		super(termData) 
		this.faces = 8;
	}

	static DENOMINATION= "c"

	static getResultLabel(result) {
		return {
			"1":"BN",
			"2":"BNS",
			"3":"&nbsp",
			"4":"Ch",
			"5":"Ch",
			"6":"Ch2",
			"7":"Ch2",
			"8":"Chaos",
		}[result]
	}

	static getResultClass(result) {
		return "rolled-"+{
			"1":"bane",
			"2":"bane-S",
			"3":"blank",
			"4":"challenge",
			"5":"challenge",
			"6":"challenge-S",
			"7":"challenge-S",
			"8":"star",
		}[result]
	}
}

class ConservativeDie extends WFRP3eDie {
	constructor(termData) {
		super(termData) 
		this.faces = 10;
	}

	static DENOMINATION= "v"

	static getResultLabel(result) {
		return {
			"1":"&nbsp",
			"2":"BS",
			"3":"SD",
			"4":"SD",
			"5":"B",
			"6":"B",
			"7":"S",
			"8":"S",
			"9":"S",
			"10":"S"
		}[result]
	}

	static getResultClass(result) {
		return "rolled-"+{
			"1":"blank",
			"2":"boon-success",
			"3":"success-delay",
			"4":"success-delay",
			"5":"boon",
			"6":"boon",
			"7": "success",
			"8": "success",
			"9": "success",
			"10":"success"
		}[result]
	}
}

class RecklessDie extends WFRP3eDie {
	constructor(termData) {
		super(termData) 
		this.faces = 10;
	}

	static DENOMINATION= "k"

	static getResultLabel(result) {
		return {
			"1":"&nbsp",
			"2":"&nbsp",
			"3":"BN",
			"4":"BN",
			"5":"BS",
			"6":"BB",
			"7":"SS",
			"8":"SS",
			"9":"ES",
			"10":"ES"
		}[result]
	}

	static getResultClass(result) {
		return "rolled-"+{
			"1":"blank",
			"2":"blank",
			"3":"bane",
			"4":"bane",
			"5":"boon-success",
			"6":"boon-S",
			"7": "success-S",
			"8": "success-S",
			"9": "success-exert",
			"10":"success-exert"
		}[result]
	}
}


class WFRP3eRoll extends Roll {

	evaluate(options)
	{
		let result = super.evaluate(options)
		result.rollResult = {}
		for(let term of this.terms)
		{
			if (term.termResultValues)
			{
				for(let resultType in term.termResultValues)
				{
					if (!this.rollResult[resultType])
						this.rollResult[resultType] = term.termResultValues[resultType]
					else
						this.rollResult[resultType] += term.termResultValues[resultType]
				}
			}
		}
		return result;
	}

	async toMessage(messageData={}, {rollMode=null, create=true}={}) {

		// Perform the roll, if it has not yet been rolled
		if (!this._rolled) this.evaluate();
	
		let resultDisplay = []

		for(let result in this.rollResult)
		{
			resultDisplay.push(this.rollResult[result] + " " + WFRP3eRoll.resultDisplay[result])
		}

		resultDisplay = resultDisplay.join("<br>")

		let rolls = await this.getRollDisplay()

		// Prepare chat data
		messageData = mergeObject({
		  user: game.user._id,
		  type: CONST.CHAT_MESSAGE_TYPES.OTHER,
		  content: await renderTemplate("modules/wfrp3e/roll.html", {rolls, resultDisplay}),
		  sound: CONFIG.sounds.dice,
		}, messageData);
		messageData.roll = this;
	
		// Prepare message options
		const messageOptions = {rollMode};
	
		// Either create the message or just return the chat data
		return create ? ChatMessage.create(messageData) : messageData;
	  }

	static diceValues = {
		"S" : {success: 1},
		"B" : {boon: 1},
		"BB" : {boon: 2},
		"BS" : {boon : 1, success: 1},
		"SS" : {success: 2},
		"BN" : {bane : 1},
		"BNS" : {bane : 2},
		"SD" : {success: 1, delay: 1},
		"Ch" : {challenge: 1},
		"Ch2" : {challenge: 2},
		"Chaos" : {chaos: 1},
		"RS" : {success: 1, righteous: 1},
		"ES" : {success : 1, exertion: 1},
		"C" : {comet: 1}
	}

	static resultDisplay = {
		"success" : "Successes",
		"boon" : "Boons",
		"bane" : "Banes",
		"delay" : "Delay",
		"challenge" : "Challenges",
		"chaos" : "Chaos",
		"righteous" : "Righteous Successes",
		"exertion" : "Exertions",
		"comet" : "Comets"
	}

	getRollDisplay() {
		const parts = this.dice.map(d => {
		  const cls = d.constructor;
		  return {
			formula: d.formula,
			total: d.total,
			faces: d.faces,
			flavor: d.options.flavor,
			rolls: d.results.map(r => {
			  return {
				result: cls.getResultLabel(r.result),
				classes: [
				  cls.name.toLowerCase(),
				  "d" + d.faces,
				  cls.getResultClass(r.result),
				  r.rerolled ? "rerolled" : null,
				  r.exploded ? "exploded" : null,
				  r.discarded ? "discarded" : null,
				  (r.result === 1) ? "min" : null,
				  (r.result === d.faces) ? "max" : null
				].filter(c => c).join(" ")
			  }
			})
		  };
		});
		return renderTemplate("modules/wfrp3e/dice.html", { parts });
	  }
}