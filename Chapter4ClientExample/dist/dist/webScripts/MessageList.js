/**
 * Created by kishe56@gmail.com on 2018. 9. 17.
 * Blog : https://kishe89.github.io
 * Github : https://github.com/kishe89
 */
'use strict';

function MessageList(document) {
  if (!(this instanceof MessageList)) {
    throw new Error('must be created with new keyword');
  }
  var MessageItemFactory = require('./MessageItemFactory');
  this.items = document.getElementById('messageList');
  this.ItemFactory = new MessageItemFactory(document);
  this.renderTasks = [];
  this.TaskCount = 0;
  this.listener = undefined;
}
MessageList.prototype.rows = [];
MessageList.prototype.pageNo = 0;

MessageList.prototype.addItem = function (message) {
  var messageItem = this.ItemFactory.createItem(message);
  messageItem.id = this.TaskCount;
  messageItem.item.id = this.TaskCount;
  this.TaskCount++;
  this.items.appendChild(messageItem.item);
  this.renderTasks.push(messageItem);
  this.scrollToBottom();
  return messageItem;
};
MessageList.prototype.loadItem = function (message) {
  var messageItem = this.ItemFactory.loadItem(message);
  this.items.appendChild(messageItem);
  return Promise.resolve();
};
MessageList.prototype.sortList = function (items) {
  return new Promise(function (resolve, reject) {
    if (!items) return reject();
    var list = [].slice.call(items).sort(function (a, b) {
      var aDate = a.getElementsByClassName('messageElementDate')[0];
      var bDate = b.getElementsByClassName('messageElementDate')[0];
      console.log(aDate.getAttribute('data-value') + ' > ' + bDate.getAttribute('data-value') + ' is ' + (aDate.getAttribute('data-value') > bDate.getAttribute('data-value')));
      return aDate.getAttribute('data-value') > bDate.getAttribute('data-value') ? 1 : -1;
    });
    resolve(list);
  });
};
MessageList.prototype.updateList = function (items) {
  var _this = this;

  var messageList = this.items;
  items.forEach(function (element) {
    messageList.appendChild(element);
    _this.scrollToBottom();
  });
};
MessageList.prototype.changeSuccessStatus = function (message) {
  for (var index = 0; index < this.renderTasks.length; index++) {
    if (this.renderTasks[index].id === message.item.id) {
      this.ItemFactory.changeSuccessStatusMessage(this.renderTasks[index], message.result);
      this.renderTasks.splice(index, 1);
      this.TaskCount--;
      this.sortList(this.items.childNodes).then(this.updateList.bind(this)).catch(function (e) {
        console.log(e);
      });
      return;
    }
  }
};
MessageList.prototype.changeFailureStatus = function (message, listener) {
  for (var index = 0; index < this.renderTasks.length; index++) {
    if (this.renderTasks[index].id === message.item.id) {
      this.ItemFactory.changeFailureStatusMessage(this.renderTasks[index], message.result, listener);
      return;
    }
  }
};
MessageList.prototype.clearItems = function () {
  var items = this.items;
  return new Promise(function (resolve, reject) {
    while (items.firstChild) {
      items.removeChild(items.lastChild);
    }
    resolve();
  });
};

MessageList.prototype.scrollToBottom = function () {
  this.items.scrollTop = this.items.scrollHeight;
};
MessageList.prototype.setScrollListener = function (listener) {
  if (this.listener) {
    this.items.removeEventListener('scroll', this.listener);
  }
  this.listener = listener;
  this.items.addEventListener('scroll', this.listener);
};
module.exports = MessageList;
//# sourceMappingURL=MessageList.js.map
//# sourceMappingURL=MessageList.js.map