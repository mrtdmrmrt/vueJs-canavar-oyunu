new Vue ({
	el : "#app",
	data : {
		logs : [],
		player_heal : 100,
		monster_heal : 100,
		game_is_on : false,
		attack_multiple : 10,
		special_attack_multiple : 25,
		monster_attack_multiple : 15,
		heel_up_multiple:20,
		log_text : {
			attack : "OYUNCU ATAĞI",
			special_attack : "ÖZEL OYUNCU ATAĞI",
			monster_attack : "CANAVAR ATAĞI",
			heal_up : "İLK YARDIM",
			give_up : "OYUNCU PES ETTİ"
		}
	},
	methods : {
		start_game : function (){
			this.game_is_on = true;
		},
		attack : function (){
			var point = Math.ceil(Math.random() * this.attack_multiple);
			//this.monster_heal = this.monster_heal - point;
			this.monster_heal -= point;
			this.add_to_log({turn : "p" , text : this.log_text.attack + point })
			this.monster_attack();

			
		},
		special_attack : function (){
			var point = Math.ceil(Math.random() * this.special_attack_multiple);
			this.monster_heal -= point;
			this.add_to_log({turn : "p" , text : this.log_text.special_attack +  point })
			this.monster_attack();
			
		},
		heal_up : function (){
			var point = Math.ceil(Math.random() * this.heel_up_multiple);	
			this.player_heal += point;
			this.add_to_log({turn : "p" , text : this.log_text.heal_up + point})
			this.monster_attack();
			
		},
		give_up : function (){
			this.player_heal=0;
			this.add_to_log({turn : "p" , text : this.log_text.give_up})
			
		},
		monster_attack : function (){
			var point = Math.ceil(Math.random() * this.monster_attack_multiple);
			this.player_heal -= point;
			this.add_to_log({turn : "m" , text : this.log_text.monster_attack + point})
			
		},
		add_to_log : function (log){
			this.logs.push(log);
		}
	},
	watch : {
		player_heal : function (value){
			if(value <=0){
				this.player_heal = 0;
				if(confirm("Oyunu KAYBETTİN Tekrar Denemek İster Misin?")){
					this.player_heal= 100;
					this.monster_heal=100;
					this.logs= [];
				}
			}
			else if(value >= 100) {
				this.player_heal = 100;
			}
		},
		monster_heal : function(value){
			if(value <= 0){
				this.monster_heal = 0;
				if(confirm("Oyunu KAZANDIN Tekrar Denemek İster Misin?")){
					this.player_heal= 100;
					this.monster_heal=100;
					this.logs= [];
				}
			}
			
		}

	},
	computed : {
		playerProgress : function (){
			return {
				width : this.player_heal + "%"
			}
		},
		monsterProgress : function (){
			return {
				width : this.monster_heal + "%"
			}
		}
	}

})