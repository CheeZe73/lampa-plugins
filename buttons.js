(function () {
    'use strict';

    var newLampacIcon = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path d="M20.331 14.644l-13.794-13.831 17.55 10.075zM2.938 0c-0.813 0.425-1.356 1.2-1.356 2.206v27.581c0 1.006 0.544 1.781 1.356 2.206l16.038-16zM29.512 14.1l-3.681-2.131-4.106 4.031 4.106 4.031 3.756-2.131c1.125-0.893 1.125-2.906-0.075-3.8zM6.538 31.188l17.55-10.075-3.756-3.756z" fill="currentColor"></path></svg>';

    Lampa.Listener.follow('full', function (e) {
        if (e.type === 'complite') {
            setTimeout(function () {
                var fullContainer = e.object.activity.render();
                var targetContainer = fullContainer.find('.full-start-new__buttons');

                fullContainer.find('.button--play').remove();

                var allButtons = fullContainer.find('.buttons--container .full-start__button')
                    .add(targetContainer.find('.full-start__button'));

                var onlineButton = allButtons.filter('.view--online.lampac--button');
                var torrentButton = allButtons.filter('.view--torrent');
                var rutubeButton = allButtons.filter('.view--rutube_trailer');
                var trailerButton = allButtons.filter('.view--trailer');
                var bookButton = allButtons.filter('.button--book');
                var reactionButton = allButtons.filter('.button--reaction');

                var buttonOrder = [];
                if (onlineButton.length) {
                    onlineButton.find('svg').replaceWith(newLampacIcon);
                    buttonOrder.push(onlineButton);
                }
                if (torrentButton.length) buttonOrder.push(torrentButton);
                if (rutubeButton.length) buttonOrder.push(rutubeButton);
                if (trailerButton.length) buttonOrder.push(trailerButton);

                allButtons.filter(function () {
                    return !$(this).is(onlineButton) &&
                           !$(this).is(torrentButton) &&
                           !$(this).is(rutubeButton) &&
                           !$(this).is(trailerButton) &&
                           !$(this).is(bookButton) &&
                           !$(this).is(reactionButton);
                }).each(function () {
                    buttonOrder.push($(this));
                });

                buttonOrder.push(bookButton);
                buttonOrder.push(reactionButton);

                targetContainer.empty();
                buttonOrder.forEach(function ($button) {
                    targetContainer.append($button);
                });

                // Включаем "full_start" после выполнения
                Lampa.Controller.toggle("full_start");

            }, 10); // Таймаут 10 мс
        }
    });

    if (typeof module !== 'undefined' && module.exports) {
        module.exports = {};
    }
})();

