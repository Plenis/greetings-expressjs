let assert = require("assert");
let greetingOpp = require("../greetings");

describe('greet' , function(){

    it('should greet name in isiXhosa, if isiXhosa is selected' , function(){
        let input = greetingOpp();
        assert.equal('Molo, Sino!', input.greet('Sino', 'isiXhosa'));
        assert.equal(1, input.nameCounter())
    })
    
    it('should greet name in English, if English is selected' , function(){
        let input = greetingOpp();
        assert.equal('Hello, Sino!', input.greet('Sino', 'English'));
        assert.equal(1, input.nameCounter())
    })

    it('should greet name in Afrikaans, if Afrikaans is selected' , function(){
        let input = greetingOpp();
        assert.equal('Awe, Sino!', input.greet('Sino', 'Afrikaans'));
        assert.equal(1, input.nameCounter())
    })
  

    it('should show a counter of how many people have been greeted' , function(){
        let input = greetingOpp();
        input.greet('Sino')
        assert.equal(1, input.nameCounter());
    })
     
    it('should show a counter of how many people have been greeted if 2 names are entered and greeted' , function(){
        let input = greetingOpp();
        input.greet('Sino')
        input.greet('Lisa')
        assert.equal(2, input.nameCounter());
    })

    it('should show a counter of how many people have been greeted if 6 names are entered greeted', function(){
        let input = greetingOpp();
        input.greet('Sino')
        input.greet('Lisa')
        input.greet('Phillip')
        input.greet('Khanyo')
        input.greet('Amahle')
        input.greet('Sammy')
        assert.equal(6, input.nameCounter());
    })

});