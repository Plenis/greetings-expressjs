// let assert = require("assert");
// let GreetingOpp = require("../greetings");
// const pg = require("pg");
// const Pool = pg.Pool;

// // we are using a special test database for the tests
// const connectionString =
//   "postgresql://sino:codex123@localhost:5432/greeting_opp";

// const pool = new Pool({
//   connectionString
// });

// describe('The basic greeting web app', function(){

//     beforeEach(async function(){
//         // clean the tables before each test run
//         await pool.query("delete from greet_name;");
//         await pool.query("delete from greet_count;");
//     });

//     it('should greet name in isiXhosa, if isiXhosa is selected', async function(){
        
//         // the Factory Function is called GreetingOpp
//         let input = GreetingOpp(pool);
//         await input.greet('Sino', 'isiXhosa');

//         let greeted = await input.greetMessage();
//         assert.equal(greeted, "Molo, Sino!");

//     });

//     after(function(){
//         pool.end();
//     })
// });

// describe('greet' , function(){

//     it('should greet name in isiXhosa, if isiXhosa is selected' , function(){
//         let input = greetingOpp();
//         assert.equal('Molo, Sino!', input.greet('Sino', 'isiXhosa'));
//         assert.equal(1, input.nameCounter())
//     })
    
//     it('should greet name in English, if English is selected' , function(){
//         let input = greetingOpp();
//         assert.equal('Hello, Sino!', input.greet('Sino', 'English'));
//         assert.equal(1, input.nameCounter())
//     })

//     it('should greet name in Afrikaans, if Afrikaans is selected' , function(){
//         let input = greetingOpp();
//         assert.equal('Awe, Sino!', input.greet('Sino', 'Afrikaans'));
//         assert.equal(1, input.nameCounter())
//     })
  

//     it('should show a counter of how many people have been greeted' , function(){
//         let input = greetingOpp();
//         input.greet('Sino')
//         assert.equal(1, input.nameCounter());
//     })
     
//     it('should show a counter of how many people have been greeted if 2 names are entered and greeted' , function(){
//         let input = greetingOpp();
//         input.greet('Sino')
//         input.greet('Lisa')
//         assert.equal(2, input.nameCounter());
//     })

//     it('should show a counter of how many people have been greeted if 6 names are entered greeted', function(){
//         let input = greetingOpp();
//         input.greet('Sino')
//         input.greet('Lisa')
//         input.greet('Phillip')
//         input.greet('Khanyo')
//         input.greet('Amahle')
//         input.greet('Sammy')
//         assert.equal(6, input.nameCounter());
//     })

//     it('should count duplicated name entries as one' , function(){
//         let input = greetingOpp();
//         input.greet('Sino')
//         input.greet('Sino')
//         input.greet('Sino')
//         assert.equal(1, input.nameCounter());
//     })

// });