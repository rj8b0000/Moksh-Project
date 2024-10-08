const config = {
    screens : {
        EventScreen : {
            path : 'event',
        },
        Awards : {
            path  : 'awards',
        }
    }
}
const linking  = {
    prefixes : ["demo://app"],
    config,
}
export default linking;