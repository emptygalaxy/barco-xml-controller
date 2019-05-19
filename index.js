const net = require('net');

let _ip = '192.168.50.100';
let _port = 9876;

let _guid = '3c15c2e7e400-e043d3';
let _maxTransPos = 4096;

let client = new net.Socket();

/**
 *
 * @param {string} ip
 */
function connect(ip)
{
    _ip = ip;

    client.connect(_port, _ip, function() {
        console.log('CONNECTED TO: ' + _ip + ':' + _port);
    });
}

client.on('data', function(data) {
    console.log('DATA: ' + data);
});

client.on('close', function() {
    console.log('Connection closed');
});

/**
 *
 * @param {number} position
 * @return {string}
 */
function getTransPosBody(position)
{
	return '<System id="0" GUID="' + _guid + '">\
	  <DestMgr id="0">\
	    <ScreenDestCol id="0">\
	      <ScreenDest id="0">\
	        <Transition id="0">\
	          <TransPos>' + (position * _maxTransPos) + '</TransPos>\
	        </Transition>\
	      </ScreenDest>\
	    </ScreenDestCol>\
	  </DestMgr>\
	</System>';
}

/**
 *
 * @param {number} position
 */
function setTransitionPosition(position)
{
    let body = getTransPosBody(position);
    client.write(body);
}

/**
 *
 * @param {string} preset
 */
function recallPreset(preset)
{
    let body = '<System id="0" GUID="' + _guid + '">\
  <PresetMgr id="0">\
    <RecallPreset>' + preset + '</RecallPreset>\
  </PresetMgr>\
</System>';
    client.write(body);
}

/**
 *
 */
function autoTrans()
{
    let body = '<System id="0" GUID="' + _guid + '">\
  <DestMgr id="0">\
    <AutoTrans></AutoTrans>\
  </DestMgr>\
</System>';
    client.write(body);
}

exports.connect = connect;
exports.setTransitionPosition = setTransitionPosition;
exports.recallPreset = recallPreset;
exports.autoTrans = autoTrans;