import 'dotenv/config'

(() => {
    main()
})();


function main() {
    console.log(`Running from port ${process.env.PORT}`);   
}