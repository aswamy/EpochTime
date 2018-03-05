#!/usr/bin/gjs

const St = imports.gi.St;
const Main = imports.ui.main;
const GnomeDesktop = imports.gi.GnomeDesktop;

const Clipboard = St.Clipboard.get_default();
const CLIPBOARD_TYPE = St.ClipboardType.CLIPBOARD;

let text, button, label;
let clock, clockListener;

function init() {
	clock = new GnomeDesktop.WallClock();
	button = new St.Bin({
		style_class: 'panel-button',
		reactive: true,
		can_focus: true,
		x_fill: true,
		y_fill: false,
		track_hover: true
	});
	label = new St.Label({text: '', opacity: 200});
	button.set_child(label);
	button.connect('button-press-event', _copyNow);
}

function enable() {
	clockListener = clock.connect('notify::clock', updateTime);
	Main.panel._centerBox.insert_child_at_index(button, 1);
}

function disable() {
	Main.panel._centerBox.remove_child(button);
	clock.disconnect(clockListener);
}

function updateTime() {
	label.set_text(_now());
}

function _now() {
	return Math.round((new Date()).getTime()/1000).toString();
}

function _copyNow() {
	Clipboard.set_text(CLIPBOARD_TYPE, _now());
}
