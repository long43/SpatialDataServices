A=[Aa]
B=[Bb]
C=[Cc]
D=[Dd]
E=[Ee]
F=[Ff]
G=[Gg]
H=[Hh]
I=[Ii]
J=[Jj]
K=[Kk]
L=[Ll]
M=[Mm]
N=[Nn]
O=[Oo]
P=[Pp]
Q=[Qq]
R=[Rr]
S=[Ss]
T=[Tt]
U=[Uu]
V=[Vv]
W=[Ww]
X=[Xx]
Y=[Yy]
Z=[Zz]

DOLLAR=(\$)
LPAREN=(\()
LBRACE=(\[)
MINUS=(\-)
PLUS=(\+)
RPAREN=(\))
RBRACE=(\])
COMMA=(\,)

ASC={A}{S}{C}
AND={A}{N}{D}
DATETIME={D}{A}{T}{E}{T}{I}{M}{E}
DESC={D}{E}{S}{C}
EQ={E}{Q}
GE={G}{E}
GT={G}{T}
LE={L}{E}
LT={L}{T}
NE={N}{E}
NOT={N}{O}{T}
OR={O}{R}

LETTER=[a-zA-Z]

DIGIT=[0-9]

SIGN=({PLUS}|{MINUS})

ALPHANUM=[a-zA-Z0-9_]

DECIMAL_LITERAL={SIGN}?({DIGIT}+{M}|{DIGIT}*(\.){DIGIT}+{M}?)

DOUBLE_LITERAL={SIGN}?(({DIGIT}+{D})|({DIGIT}*(\.){DIGIT}+{D})|({DIGIT}*(\.){DIGIT}+{E}{SIGN}{DIGIT}+))

INT32_LITERAL={SIGN}?{DIGIT}+

INT64_LITERAL={INT32_LITERAL}{L}

IDENTIFIER={ALPHANUM}*

STRING_LITERAL='([^'\r\n ])*'

DATETIME_LITERAL={DATETIME}{STRING_LITERAL}

SPACE=([ \t\b\f])+


       