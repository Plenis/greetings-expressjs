let assert = require("assert");
let GreetingOpp = require("../greetings");
const pg = require("pg");
const Pool = pg.Pool;

// we are using a special test database for the tests
const connectionString =
 process.env.DATABASE_URL || "postgresql://sino:codex123@localhost:5432/greeting_opp"

 let useSSL = false;
 let local = process.env.LOCAL || false;
 if (process.env.DATABASE_URL && !local) {
     useSSL = true;
 }
 const pool = new Pool({
     connectionString,
     ssl: useSSL
 });


describe('The basic greeting web app', function(){

    beforeEach(async function(){
        // clean the tables before each test run
        await pool.query("delete from greeted_names;");
    });

    it('should greet name in isiXhosa, if isiXhosa is selected', async function(){
        
        // the Factory Function is called GreetingOpp
        let input = GreetingOpp(pool);
        await input.greet('Sino', 'isiXhosa');

        let greeted = await input.greetMessage();
        assert.equal(greeted, "Molo, Sino!");

    });
    

    it('should greet name in English, if English is selected', async function(){
        
        // the Factory Function is called GreetingOpp
        let input = GreetingOpp(pool);
        await input.greet('Sino', 'English');

        let greeted = await input.greetMessage();
        assert.equal(greeted, "Hello, Sino!");

    });


    it('should greet name in Afrikaans, if Afrikaans is selected', async function(){
        
        // the Factory Function is called GreetingOpp
        let input = GreetingOpp(pool);
        await input.greet('Sino', 'Afrikaans');

        let greeted = await input.greetMessage();
        assert.equal(greeted, "Awe, Sino!");

    });

    it('should show a counter of how many people have been greeted' , async function(){
        let input = GreetingOpp(pool);
        await input.greet('Sino');

        let counter = await input.nameCounter();
        assert.equal(counter, 1);
    });

    it('should count duplicated name entries as one' , async function(){
        let input = GreetingOpp(pool);
         await input.greet('Sino')
        await input.greet('Sino')
        await input.greet('Sino')

        let counter = await input.nameCounter();
        assert.equal(counter, 1);
    })

    it('should not count entries with numbers' , async function(){
        let input = GreetingOpp(pool);
        await input.greet('Sin1o');
        await input.greet('S22o');
        await input.greet('9876');

        let counter = await input.nameCounter();
        assert.equal(counter, 0);
    });

        it('should show a counter of how many people have been greeted if different 6 names are entered greeted', async function(){
        let input = GreetingOpp(pool);
       await input.greet('Sino')
       await input.greet('Lisa')
       await input.greet('Phillip')
       await input.greet('Khanyo')
       await input.greet('Amahle')
       await input.greet('Sammy')

       let counter = await input.nameCounter();
        assert.equal(counter, 6);
    })


    after(function(){
        pool.end();
    })
});
