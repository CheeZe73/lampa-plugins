(function () {
    'use strict';

    var newLampacIcon = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path d="M20.331 14.644l-13.794-13.831 17.55 10.075zM2.938 0c-0.813 0.425-1.356 1.2-1.356 2.206v27.581c0 1.006 0.544 1.781 1.356 2.206l16.038-16zM29.512 14.1l-3.681-2.131-4.106 4.031 4.106 4.031 3.756-2.131c1.125-0.893 1.125-2.906-0.075-3.8zM6.538 31.188l17.55-10.075-3.756-3.756z" fill="currentColor"></path></svg>';

    function reorderButtons(fullContainer) {
        var targetContainer = fullContainer.find('.full-start-new__buttons');

        fullContainer.find('.button--play').remove();

        var buttonsFromContainer = fullContainer.find('.buttons--container .full-start__button');
        var buttonsFromTarget = targetContainer.find('.full-start__button');
        var allButtons = buttonsFromContainer.add(buttonsFromTarget.not(buttonsFromContainer));

        var onlineButtons = allButtons.filter(function () {
            return $(this).attr('class').toLowerCase().includes('online');
        });
        var torrentButton = allButtons.filter('.view--torrent');
        var trailerButtons = allButtons.filter(function () {
            return $(this).attr('class').toLowerCase().includes('trailer');
        });
        var subscribeButton = allButtons.filter('.button--subscribe');
        var bookButton = allButtons.filter('.button--book');
        var reactionButton = allButtons.filter('.button--reaction');

        var otherButtons = allButtons.filter(function () {
            return !$(this).attr('class').toLowerCase().includes('online') && 
                   !$(this).is(torrentButton) && 
                   !$(this).attr('class').toLowerCase().includes('trailer') && 
                   !$(this).is(subscribeButton) && 
                   !$(this).is(bookButton) && 
                   !$(this).is(reactionButton);
        });

        var buttonOrder = [];

        onlineButtons.each(function () {
            $(this).find('svg').replaceWith(newLampacIcon);
            buttonOrder.push($(this));
        });

        if (torrentButton.length) buttonOrder.push(torrentButton);

        trailerButtons.each(function () {
            buttonOrder.push($(this));
        });

        otherButtons.each(function () {
            buttonOrder.push($(this));
        });

        if (subscribeButton.length) buttonOrder.push(subscribeButton);

        if (bookButton.length) buttonOrder.push(bookButton);

        if (reactionButton.length) buttonOrder.push(reactionButton);

        targetContainer.empty();
        buttonOrder.forEach(function ($button) {
            targetContainer.append($button);
        });

        if (targetContainer[0].scrollWidth > targetContainer[0].clientWidth) {
            targetContainer.css('flex-wrap', 'wrap');
        }
    }

    Lampa.Listener.follow('full', function (e) {
        if (e.type === 'complite') {
            var fullContainer = e.object.activity.render();
            reorderButtons(fullContainer);

            // Наблюдатель за изменениями в DOM
            var observer = new MutationObserver(function () {
                reorderButtons(fullContainer);
            });
            observer.observe(fullContainer[0], { childList: true, subtree: true });
        }
    });

    if (typeof module !== 'undefined' && module.exports) {
        module.exports = {};
    }
})();
