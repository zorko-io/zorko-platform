export default {
    fatal: (...args)    =>  { console.log('[fatal]', args); },
    error: (...args)    =>  { console.log('[error]', args); },
    warn: (...args)     =>  { console.log('[warn]', args); },
    info: (...args)     =>  { console.log('[info]', args); },
    debug: (...args)    =>  { console.log('[debug]', args); },
}