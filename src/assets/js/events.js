function ajustMenu() {
    const tabBar = document.querySelector('.tab-bar')
    const tabBarMobile = document.querySelector('.tab-bar-mobile');

    tabBar.style.display = 
        document.body.clientWidth < 550 ? 'none' : 'flex';
    tabBarMobile.style.display = 
        document.body.clientWidth < 550 ? 'flex' : 'none';
}

document.querySelector('#menu-btn').onclick = function () {
    const menuHeader = document.querySelector('.menu-header');
    menuHeader.style.display =
        (menuHeader.style.display || 'none') === 'none' ?
            'flex' : 'none';
};
document.querySelector('#menu-btn-mobile').onclick = function () {
    const menuHeader = document.querySelector('.menu-header');
    menuHeader.style.display =
        (menuHeader.style.display || 'none') === 'none' ?
            'flex' : 'none';
};
window.onload = function () {
    ajustMenu();
}
window.onresize = function() {
    ajustMenu();
};