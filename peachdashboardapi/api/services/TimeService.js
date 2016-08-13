module.exports =
{
  strtotime: function (str, now) {
    var i, match, s, strTmp = '',
      parse = '';
    strTmp = str;
    strTmp = strTmp.replace(/\s{2,}|^\s|\s$/g, ' '); // unecessary spaces
    strTmp = strTmp.replace(/[\t\r\n]/g, ''); // unecessary chars
    if (strTmp == 'now') {
      return (new Date()).getTime() / 1000; // Return seconds, not milli-seconds
    } else if (!isNaN(parse = Date.parse(strTmp))) {
      return (parse / 1000);
    } else if (now) {
      now = new Date(now * 1000); // Accept PHP-style seconds
    } else {
      now = new Date();
    }
    strTmp = strTmp.toLowerCase();
    var __is = {
      day: {
        'sun': 0,
        'mon': 1,
        'tue': 2,
        'wed': 3,
        'thu': 4,
        'fri': 5,
        'sat': 6
      },
      mon: {
        'jan': 0,
        'feb': 1,
        'mar': 2,
        'apr': 3,
        'may': 4,
        'jun': 5,
        'jul': 6,
        'aug': 7,
        'sep': 8,
        'oct': 9,
        'nov': 10,
        'dec': 11
      }
    };
    var process = function (m) {
      var ago = (m[2] && m[2] == 'ago');
      var num = (num = m[0] == 'last' ? -1 : 1) * (ago ? -1 : 1);

      switch (m[0]) {
        case 'last':
        case 'next':
          switch (m[1].substring(0, 3)) {
            case 'yea':
              now.setFullYear(now.getFullYear() + num);
              break;
            case 'mon':
              now.setMonth(now.getMonth() + num);
              break;
            case 'wee':
              now.setDate(now.getDate() + (num * 7));
              break;
            case 'day':
              now.setDate(now.getDate() + num);
              break;
            case 'hou':
              now.setHours(now.getHours() + num);
              break;
            case 'min':
              now.setMinutes(now.getMinutes() + num);
              break;
            case 'sec':
              now.setSeconds(now.getSeconds() + num);
              break;
            default:
              var day;
              if (typeof (day = __is.day[m[1].substring(0, 3)]) != 'undefined') {
                var diff = day - now.getDay();
                if (diff === 0) {
                  diff = 7 * num;
                } else if (diff > 0) {
                  if (m[0] == 'last') {
                    diff -= 7;
                  }
                } else {
                  if (m[0] == 'next') {
                    diff += 7;
                  }
                }
                now.setDate(now.getDate() + diff);
              }
              break;
          }
          break;
        default:
          if (/\d+/.test(m[0])) {
            num *= parseInt(m[0], 10);
            switch (m[1].substring(0, 3)) {
              case 'yea':
                now.setFullYear(now.getFullYear() + num);
                break;
              case 'mon':
                now.setMonth(now.getMonth() + num);
                break;
              case 'wee':
                now.setDate(now.getDate() + (num * 7));
                break;
              case 'day':
                now.setDate(now.getDate() + num);
                break;
              case 'hou':
                now.setHours(now.getHours() + num);
                break;
              case 'min':
                now.setMinutes(now.getMinutes() + num);
                break;
              case 'sec':
                now.setSeconds(now.getSeconds() + num);
                break;
            }
          } else {
            return false;
          }
          break;
      }
      return true;
    };

    match = strTmp.match(/^(\d{2,4}-\d{2}-\d{2})(?:\s(\d{1,2}:\d{2}(:\d{2})?)?(?:\.(\d+))?)?$/);
    if (match !== null) {
      if (!match[2]) {
        match[2] = '00:00:00';
      } else if (!match[3]) {
        match[2] += ':00';
      }
      s = match[1].split(/-/g);
      for (i in __is.mon) {
        if (__is.mon[i] == s[1] - 1) {
          s[1] = i;
        }
      }
      s[0] = parseInt(s[0], 10);
      s[0] = (s[0] >= 0 && s[0] <= 69) ? '20' + (s[0] < 10 ? '0' + s[0] : s[0] + '') : (s[0] >= 70 && s[0] <= 99) ? '19' + s[0] : s[0] + '';
      return parseInt(this.strtotime(s[2] + ' ' + s[1] + ' ' + s[0] + ' ' + match[2]) + (match[4] ? match[4] / 1000 : ''), 10);
    }

    var regex = '([+-]?\\d+\\s' + '(years?|months?|weeks?|days?|hours?|min|minutes?|sec|seconds?' + '|sun\\.?|sunday|mon\\.?|monday|tue\\.?|tuesday|wed\\.?|wednesday' + '|thu\\.?|thursday|fri\\.?|friday|sat\\.?|saturday)' + '|(last|next)\\s' + '(years?|months?|weeks?|days?|hours?|min|minutes?|sec|seconds?' + '|sun\\.?|sunday|mon\\.?|monday|tue\\.?|tuesday|wed\\.?|wednesday' + '|thu\\.?|thursday|fri\\.?|friday|sat\\.?|saturday))' + '(\\sago)?';
    match = strTmp.match(new RegExp(regex, 'gi'));
    if (match === null) {
      return false;
    }
    for (i = 0; i < match.length; i++) {
      if (!process(match[i].split(' '))) {
        return false;
      }
    }
    return (now.getTime() / 1000);
  }
}