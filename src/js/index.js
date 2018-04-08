/* eslint-disable func-names */
require('../css/index.scss');


const UI = {
    init() {
        this.tab($('.news-tab'));
        this.tab($('.roles_box'));
        this.slider();
        this.initRolesTab();
        this.initGw();
    },
    tab($tab, type, actioner, rb) {
        let s = actioner;
        let eventType;
        if (type === 1) {
            eventType = 'click';
        } else {
            eventType = 'mouseover';
        }
        if (!s) s = 'a';
        $tab.find(s).on(eventType, function (e) {
            const $a = $(this);
            const $aParent = $a.closest('ul');
            const d = $a.attr('data-target');
            const $target = $(d);
            // const $targetParent = $target.closest('.tab-pane');
            $target.siblings('.tab-content').removeClass('cur');
            $aParent.find('li').removeClass('cur');
            if (s === 'a') {
                $a.parent().addClass('cur');
            } else {
                $a.addClass('cur');
            }
            $target.addClass('cur');
            if (typeof rb === 'function') {
                rb(e);
            }
        });
    },
    initRolesTab() {
        $('.role_title').find('a').on('mouseover', function (e) {
            const $a = $(this);
            const index = $a.index();
            const $target = $('.role_content').find('.role_item').eq(index);
            $target.siblings('.role_item').removeClass('cur');
            $target.addClass('cur');
            $a.siblings('a').removeClass('cur');
            $a.addClass('cur');
        });
    },
    slider() {
        new f2eGame.ui.Slide({
            $element: document.getElementById('banner'),
            effect: 'fade',
            event: 'click'
        });
    },
    initGw() {

    }

};
const GW = {
    init() {
        this.opts = {
            gameId: 'JTFS',
            serverType: 'GENERAL,KK,LOLBOX',
            online: true,
            hotNum: 2
        };
        this.initPage().then(() => {
            this.stat();
            this.headerAndFooter();
            this.enterGame();
            this.serverList();
            this.serverDialog();
        });
    },
    login() {
        f2eGame.port.udb.login();
    },
    initPage() {
        return f2eGame.port.udb.isLogin().then((isLogin) => {
            this.isLogin = isLogin;
            return isLogin;
        });
    },
    stat() {
        f2eGame.util.initGW({
            type: 'yy_ly',
            standId: '10894'
        });
    },
    headerAndFooter() {
        new f2eGame.ui.Header.WebGameYY({
            $element: document.getElementById('header')
        });
        new f2eGame.ui.Footer({
            $element: document.getElementById('footer'),
            backgroundStyle: 'black'
        });
    },
    enterGame() {
        $(document).on('click', '.gw-enter-game', (e) => {
            e.preventDefault();
            if (this.isLogin) {
                f2eGame.port.statpid.gameStat({
                    gameId: this.opts.gameId,
                    serverId: '',
                    eid: '',
                    eid_desc: ''
                });
            } else {
                this.login();
            }
            // this.isLogin ? : self.loginFn();
        });
    },
    serverList() {
        new f2eGame.ui.Server.MiniList({
            $element: $('.gw-server-list')[0],
            gameId: this.opts.gameId,
            online: true,
            showNumber: this.opts.hotNum,
            showIcon: false,
            showDescIcon: false
        });
    },
    serverDialog() {
        $('.gw-server-choose').click((e) => {
            e.preventDefault();
            new f2eGame.ui.Server.Dialog({
                dependComponents: {
                    dialog: {
                        maskClose: false
                    },
                    serverRecent: this.opts,
                    serverList: Object.assign(this.opts, {
                        classNames: {
                            body: 'gw-server-dialog'
                        }
                    })
                }
            });
        });
    }

};

UI.init();
GW.init();
