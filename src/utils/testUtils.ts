import { fireEvent } from '@testing-library/dom';

// TODO CSR: 1/ "utils-ul" nostru pe care il furnizam userului este deja clasa TAD. El stie ca are un loc unic in care
// cauta ale noaste "goodies". Acolo este deci locul potrivit pt ac functie. Spre exemplu "drag", tot acolo a fost pus.
// UPDATE: acum vad ca functia asta sta in proiectul gantt si nu in TAD. E o functie de care o sa aiba probabil nevoie
// multa lume; deci tr mutata acolo.
// 2/ vad ca nu se trec prin clasele noastre proxificate (cele cu awaitable). Deci nu se afiseaza automat ecran de captura
// de aceea tu in testul tau ai fost nevoita sa afisezi de mana. 
// Cand mai sunt evenimente din astea, unde ar fi trebuit sa faca lib ceva, dar de fapt facem noi cod in locul ei,
// * fie pt ca nu am folosit cum trebuie, 
// * fie pt ca e greu de folosit (i.e. ne forteaza sa scriem multe linii vs putine), 
// * fie ca are lib bug/lipsuri
// => de luat atitudine pt imbogatirea lib
export const rightClick = (element, options = {}) => {
    fireEvent.mouseDown(element, {button: 2, ...options});
    fireEvent.mouseUp(element, {button: 2, ...options});
    fireEvent.contextMenu(element, options);
}