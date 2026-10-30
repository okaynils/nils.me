// The death's-head hawkmoth has lived at the bottom of this site for years.
const art = String.raw`.-"""""""---,.               n,                                      ..--------..
\-          ,,'''-..      n   '\.                ,.n           ..--''           )
 \-     . .,;))     ''-,   \     ''.. .'"'. .,-''    .n   ..-''   (( o         _/
  \- ' ''''':'          ''-.'"|'--_  '     '  ,.--'''..-''         ' ' ' - .  _/
   \-                       ''->.  \'  ,--. '/' >..''                        _/
    \                     (,       /  /.  .\ \ ''    ,)                     ./
     ''.    .  ..         ')          \ .. /         ('          ..       ./
        ''-... . ._ .__         .''.  //..\\  ,'.            __ _ _,__.--'
            /' ((    ..'' ' ' '-'  6  \/__\/  ' '- - -' ' ',''   - '\
           '(.  6,    '..          /.   ''  .'          ,,'     ) )  )
            '\  \'C_,_   ==,      / '_      _|\       ,'', ,,_.;-' _/
              '._ ,   ')   E     /'|_ ')()('_' \     C  ,I'''  _.-'
                 ''''''\ (('   ,/  ''  (()) ''  '-._ _ __---'''
                        '' '' '    '==='()'=='
                                   '(       )'
                                   '6        '
                                    \       /
                                    '       '
                                    '       '
                                     '     '
                                      '   '
                                       '.'`;

export function Moth() {
  return (
    <figure className="mt-10 overflow-hidden">
      <pre aria-hidden className="w-max font-mono text-[6px] leading-[1.2] mx-auto text-ink-3 select-none sm:text-[10px]">{art}</pre>
      <figcaption className="mt-2 text-center font-mono text-xs text-ink-3">acherontia atropos</figcaption>
    </figure>
  );
}
