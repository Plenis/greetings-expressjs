let assert = require("assert");
let GreetingOpp = require("../greetings");
const pg = require("pg");
const Pool = pg.Pool;

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


describe('Greeting app testing basic functionality + database testing', function(){

    it('should greet name in isiXhosa, if isiXhosa is selected', async function(){
        await pool.query("delete from greeted_names;");

        let input = GreetingOpp(pool);
        await input.greet('Sino', 'isiXhosa');

        let greeted = await input.greetMessage();
        assert.equal(greeted, "Molo, Sino!");

    });
    

    it('should greet name in English, if English is selected', async function(){
        await pool.query("delete from greeted_names;");

        let input = GreetingOpp(pool);
        await input.greet('Sino', 'English');

        let greeted = await input.greetMessage();
        assert.equal(greeted, "Hello, Sino!");

    });


    it('should greet name in Afrikaans, if Afrikaans is selected', async function(){
        await pool.query("delete from greeted_names;");

        let input = GreetingOpp(pool);
        await input.greet('Sino', 'Afrikaans');

        let greeted = await input.greetMessage();
        assert.equal(greeted, "Awe, Sino!");

    });

    it('should show a counter of how many people have been greeted' , async function(){
        await pool.query("delete from greeted_names;");

        let input = GreetingOpp(pool);
        await input.greet('Sino');

        let counter = await input.nameCounter();
        assert.equal(counter, 1);
    });

    it('should count duplicated name entries as one' , async function(){
        await pool.query("delete from greeted_names;");

        let input = GreetingOpp(pool);
         await input.greet('Sino')
        await input.greet('Sino')
        await input.greet('Sino')

        let counter = await input.nameCounter();
        assert.equal(counter, 1);
    })

        it('should show a counter of how many people have been greeted if different 6 names are entered greeted', async function(){
            await pool.query("delete from greeted_names;");

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


    it('should store greeted names in data base', async function () {
        await pool.query("delete from greeted_names;");
    
        let input = GreetingOpp(pool);
        await input.greet('Amahle');
        await input.greet('Lisa');
        await input.greet('Sammy');
        await input.greet('Phillip');
        await input.greet('Khanyo');

        let greetDisplay = await pool.query('SELECT greet_name FROM greeted_names');
        assert.deepEqual(greetDisplay.rows, [ { greet_name: 'Amahle'}, { greet_name: 'Lisa' }, { greet_name: 'Sammy' }, { greet_name: 'Phillip'}, { greet_name: 'Khanyo'}]);
    });

    it('should exclude the repeated name and return 2 of the entered names', async function () {
        await pool.query("delete from greeted_names;");
    
        let input = GreetingOpp(pool);
        await input.greet('Lisa');
        await input.greet('Lisa');
        await input.greet('Sammy');

        let greetDisplay = await pool.query('SELECT greet_name FROM greeted_names');
        assert.deepEqual(greetDisplay.rows, [{ greet_name: 'Lisa' }, { greet_name: 'Sammy' }]);
    });

    it('should store names and show how many times each name has been greeted', async function () {
        await pool.query("delete from greeted_names;");
    
        let input = GreetingOpp(pool);
        await input.greet('Lisa');
        await input.greet('Lisa');
        await input.greet('Sammy');
        await input.greet('Amahle');
        await input.greet('Amahle');
        await input.greet('Amahle');
        await input.greet('Amahle');
        await input.greet('Amahle');
        await input.greet('Amahle');

        let greetDisplay = await pool.query('SELECT greet_name, greet_count FROM greeted_names');
        assert.deepEqual(greetDisplay.rows, [{ greet_count: 2, greet_name: 'Lisa' }, { greet_count: 1, greet_name: 'Sammy' }, { greet_count: 6, greet_name: 'Amahle' }]);
    });

    it('should clear all data once clear option selected', async function () {
        await pool.query("delete from greeted_names;");
    
        let input = GreetingOpp(pool);
        await input.greet('Lisa');
        await input.greet('Lisa');
        await input.greet('Sammy');

        let greetDisplay = await pool.query('SELECT greet_name FROM greeted_names');
        assert.deepEqual(greetDisplay.rows, [{ greet_name: 'Lisa' }, { greet_name: 'Sammy' }]);

        let clearOpt = await pool.query("DELETE FROM greeted_names");
        assert.deepEqual(clearOpt.rows, [])
    });

    after(function(){
        pool.end();
    })
});
