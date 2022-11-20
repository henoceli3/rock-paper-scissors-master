// gestion de l'ouvertue et de la fermeture du rules
const rulesElements = {
    closeRules : document.getElementById('close-rules'),
    rulesBox : document.getElementById('rules'),
    openRules : document.getElementById('open-rules')
};
// ouvrir les rules 
rulesElements.openRules.addEventListener('click',openRules);
function openRules(){
    rulesElements.rulesBox.classList.add('active--rules');
}
// fermer les rules 
rulesElements.closeRules.addEventListener("click",closeRules);
function closeRules(){
    rulesElements.rulesBox.classList.remove('active--rules');
}