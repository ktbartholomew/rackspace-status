SP.currentPage.registerSubscriptionForm = function(e) {
    var t = "#subscribe-form-" + e,
        n = "#subscribe-btn-" + e,
        r = "#subscribe-modal-" + e;
    $(function() {
        $("#show-updates-dropdown")
            .click(function() {
                var t;
                e ? t = "Status Incident Subscribe Modal Shown" : t = "Status Index Subscribe Modal Shown"
            }), HRB.utils.bindBasicAjaxForm(t, n, function(n, r, i) {
                var s, o;
                typeof r == "string" && (r = JSON.parse(r)), r.mode === "webhook" ? r.webhook === undefined ? (s = !1, o = {
                    text: "Please enter an endpoint and a valid email at which you can be reached.",
                    cssClass: "error"
                }) : r.webhook === null ? (s = !1, o = {
                    text: "This webhook endpoint is already subscribed to updates."
                }) : r.webhook && (s = !0, o = {
                    text: "Your endpoint is now subscribed to webhook updates. A confirmation message should arrive soon."
                }) : r.email === undefined && r.phone === undefined ? (s = !1, o = {
                    text: "Please enter a valid email or a phone number that you wish to have updates sent to.",
                    cssClass: "error"
                }) : r.email === null && r.phone === undefined ? (s = !1, o = {
                    text: "This email is already subscribed to updates."
                }, r.can_select_components && (o.text += " To manage your subscription, follow the link at the bottom of the emails we send.")) : r.email === undefined && r.phone === null ? (s = !1, o = {
                    text: "This phone is already subscribed to updates."
                }, r.can_select_components && (o.text += " To manage your subscription, follow the link located in any of the SMS messages we send.")) : r.email === null && r.phone === null ? (s = !1, o = {
                    text: "This email and phone are already subscribed to updates."
                }) : r.email && r.phone === undefined ? (s = !0, r.duplicate ? o = {
                    text: "Your email is already subscribed. Use the form below to manage your subscription."
                } : r.can_select_components ? o = {
                    text: "Your email is now subscribed to updates! Use the boxes below to specify which components you're interested in."
                } : o = {
                    text: "Your email is now subscribed to updates! A confirmation message should arrive soon."
                }) : r.email === undefined && r.phone ? (s = !0, r.duplicate ? o = {
                    text: "Your phone is already subscribed. Use the form below to manage your subscription."
                } : r.can_select_components ? o = {
                    text: "Your phone is now subscribed to updates! Use the boxes below to specify which components you're interested in."
                } : o = {
                    text: "Your phone is now subscribed to updates! A confirmation message should arrive soon."
                }) : r.email && r.phone === null ? (s = !0, o = {
                    text: "Your email is now subscribed to updates! A confirmation message should arrive soon (phone was already subscribed)."
                }) : r.email === null && r.phone ? (s = !0, o = {
                    text: "Your phone is now subscribed to updates! A confirmation message should arrive soon (email was already subscribed)."
                }) : r.email && r.phone && (s = !0, o = {
                    text: "Your email and phone are now subscribed to updates! A confirmation message should arrive soon."
                });
                var u = $(t)
                    .find("[data-js-hook=phone-number]")
                    .val(),
                    a = $(t)
                    .find("[data-js-hook=email]")
                    .val();
                u && u.length && $.cookie("phone_number", u), a && a.length && $.cookie("email", a);
                if (s) {
                    var f;
                    e ? f = "Status Incident Subscriber Created" : f = "Status Index Subscriber Created";
                    if (r.can_select_components) {
                        HRB.utils.notify(o.text, {
                            cssClass: o.cssClass,
                            method: "deferred"
                        }), window.location.href = "/manage/" + (r.email || r.phone || r.webhook);
                        return
                    }
                }
                HRB.utils.notify(o.text, {
                    cssClass: o.cssClass
                })
            }, function(e, t, n) {
                t.status == 420 ? HRB.utils.notify("Hang on there, partner. You're subscribing too fast (give it a quick second and try again).", {
                    cssClass: "error"
                }) : HRB.utils.basicFailAndReload(e)
            })
    })
}, $(function() {
    SP.currentPage.updatesDropdown = {
            getParent: function() {
                return HRB.utils.djshook("updates-dropdown-container")
            },
            getDropdown: function() {
                return HRB.utils.djshook("updates-dropdown")
                    .filter(".updates-dropdown")
            },
            isOpen: !1,
            toggleDropdown: function() {
                this.isOpen == 0 ? this.show() : this.hide()
            },
            show: function() {
                this.getDropdown()
                    .show(), this.isOpen = !0, setTimeout(function() {
                        SP.currentPage.updatesDropdown.onBodyClose()
                    }, 300)
            },
            hide: function() {
                this.getDropdown()
                    .hide(), this.isOpen = !1, this.offBodyClose(), $(window)
                    .trigger("updatesDropdownHide")
            },
            onBodyClose: function() {
                $("body")
                    .on("click.closeDropdown", function(e) {
                        if (SP.currentPage.updatesDropdown.getDropdown()
                            .is(e.target) || !!SP.currentPage.updatesDropdown.getDropdown()
                            .has(e.target)
                            .length) return;
                        SP.currentPage.updatesDropdown.hide()
                    })
            },
            offBodyClose: function() {
                $("body")
                    .off("click.closeDropdown")
            }
        }, HRB.utils.djshook("show-updates-dropdown")
        .on("click", function() {
            SP.currentPage.updatesDropdown.toggleDropdown()
        })
}), $(function() {
    var e = $(".updates-dropdown-nav")
        .find("a"),
        t = $(".updates-dropdown-sections-container > div");
    e.on("click", function() {
        $this = $(this);
        if ($this.attr("data-js-hook") == "updates-dropdown-close") {
            SP.currentPage.updatesDropdown.hide();
            return
        }
        return $elToShow = $($this.attr("href")), e.removeClass("active"), $this.addClass("active"), t.hide(), $elToShow.show(), !1
    })
}), $(function() {
    $('[data-js-hook="show-phone-country-toggle"]')
        .on("click", function() {
            HRB.utils.djshook("modal-open-incident-subscribe-phone-number")
                .addClass("show-country-code"), $(this)
                .hide()
        })
}), $(function() {
    $('[data-js-hook="externalities-show-sms-country-toggle"]')
        .on("click", function() {
            var e = $(this);
            return e.parent()
                .parent()
                .addClass("show-country-code"), e.hide(), !1
        })
}), $(function() {
    var e = HRB.utils.djshook("images-container"),
        t = function() {
            e.css("height", parseInt(e.css("width")) * 315 / 850)
        };
    !e.length || (t(), $(window)
        .on("resize", t))
}), $(function() {
    var e = $(".starter .masthead .updates-dropdown-container"),
        t = $(".masthead"),
        n = function() {
            e.css("top", (t.height() - e.height()) / 2)
        };
    !e.length || (n(), $(window)
        .on("resize", n))
}), $(function() {
    var e = HRB.utils.djshook("updates-dropdown-container"),
        t = $("#replace-with-subscribe");
    !t.length || (t.replaceWith(e), e.css("display", "inline-block"))
});
