class WFRP3eRoller extends Application {
	static get defaultOptions()
    {
        const options = super.defaultOptions;
        options.id = "wfrp3e-roller";
        options.template = "modules/wfrp3e/roll-window.html"
        options.classes.push("wfrp3e-roller");
        options.resizable = false;
        options.height = 900;
        options.width = 600;
        options.minimizable = true;
        options.title = "WFRP3e Roller"
        return options;
	}
	

	getData()
	{
		let data = super.getData();

		data.diceTypes = [
			{
				label : "Expertise",
				key : "expertise",
				img : "expertise-blank",
			},
			{
				label : "Fortune",
				key : "fortune",
				img : "fortune-blank",
			},
			{
				label : "Misfortune",
				key : "misfortune",
				img : "misfortune-blank",
			},
			{
				label : "Challenge",
				key : "challenge",
				img : "challenge-blank",
			},
			{
				label : "Characteristic",
				key : "characteristic",
				img : "characteristic-blank",
			},
			{
				label : "Conservative",
				key : "conservative",
				img : "conservative-blank",
			},
			{
				label : "Reckless",
				key : "reckless",
				img : "reckless-blank",
			},
		]
		return data;
	}

	activateListeners(html) 
	{
		super.activateListeners(html)

		html.find(".roll-button").click(ev => {
			let rollString = []
			let inputs = $(ev.currentTarget).parents("section").find("input")

			for(let input of inputs)
			{
				if (Number(input.value))
					rollString.push(input.value + "d" + WFRP3eRoller.typeToDenomination[input.dataset["type"]])
				input.value = 0;
			}
			new WFRP3eRoll(rollString.join("+")).roll().toMessage();
		})

		html.find("input").focus(ev => {
			ev.target.select()
		})
	}

	static typeToDenomination = {
		"expertise" : "e",
		"fortune" : "f",
		"misfortune" : "m",
		"challenge" : "c",
		"characteristic" : "r",
		"conservative" : "v",
		"reckless" : "k"
	}
 
}