'use strict';

function clickHandler (db) {
    
    var clicks = db.collection('clicks');
    
    this.getClicks = function (req, res) {
        
        var clickProjection = { '_id': false };
        
        clicks.findOne({}, clickProjection, function (err, result) {
            if (err) {
                throw err;
            }
            
            res.json(result);
        });
    };
}

module. exports = clickHandler;