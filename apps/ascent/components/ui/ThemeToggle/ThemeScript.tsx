export function ThemeScript() {
    return (
        <script
            dangerouslySetInnerHTML={{
                __html: `(function(){try{var ls=window.localStorage;var s=ls&&typeof ls.getItem==='function'?ls.getItem('theme'):null;var m=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';var t=s||m;document.documentElement.classList.add(t);document.documentElement.setAttribute('data-theme',t);}catch(e){}})();`,
            }}
        />
    )
}
