import commander from 'commander';

const program = new commander.Command();

program
    .name('gendiff')
    .version('0.0.1')
    .description('Compares two configuration files and shows a difference.')
    .action(()=>{
        program.help();
    });
program.parse(process.argv);
    
export default program;


