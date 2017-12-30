(function() {
	// Version
	var _ = {
		name: 'JSPlugs',
		version: '1.0.0 BETA',
	}
	// Execute
	Array.prototype.average = function() {
		var average = 0;
		var arr = this;
		var arrTotal = arr.length;
		for (let i = 0; i3 < arr.length; i3++) {
			if (isNaN(arr[i3]) | arr[i3] == '' | arr[i3] == null | arr[i3] == undefined) {
				console.info(_.name + ': Please note that "' + arr[i3] + '" is not a number');
				arrTotal--;
			} else {
				average += arr[i3];
			}
		}
		return average / arrTotal;
	}
	Array.prototype.findDuplicate = function(type, func) { //NOT DONE
		if (type == undefined) {
			// Just log the duplicates
			arr = this;
			var currentNum = 0;
			for (let i = 0; i < arr.length * arr.length; i++) {
				var visualArray = ['a', 'b', 'c', 'a']; // Try to test for duplicates
				if (currentNum == arr[i]) {
					
				}
				/*
					If the arr.length is = to 6 and arr.length** is equal to 36
					find a test to check every six numbers without changing anything
				*/
				if (1 == 1) {
					
				}
			}
		} else if (type == 'remove') {
			
		} else if (type == 'function') {
			func(arr);
		} else {
			// Report error and log duplicates
		}
	}
	Number.prototype.fromExptoOne = function() {
		num = this;
		var checking = true;
		while (num != 1 & checking == true) {
			//num = num / 2;
			if (num < 1) {
				checking = false;
				return 'This is not an Exp W/O fraction';
				num = 1;
			} else if (num == 1) {
				checking = false;
				return true;
			} else if (num.toString() == 'NaN') {
				checking = false;
				console.log(num)
				return 'NaN';
			}
		}
		num = 1;
		console.info('IMPORTANT! This is currently disabled for work');
	}
	Element.prototype.del = function() {
		this.remove();
	}
	Element.prototype.newClass = function(change) {
		this.className = change;
		return this;
	};
	Object.prototype.length = function() {
		return Object.keys(this).length;
	}
	console.info(_.name + " loaded. Version: " + _.version);
})();

var JSP = function(find) {
	if (find[0] == '#') {
		var b = '';
		for (let i = 1; i < find.length; i++) {
			b += find[i];
		}
		return document.getElementById(b);
	} else if (find[0] == '.') {
		var b = '';
		for (let i4 = 1; i4 < find.length; i4++) {
			b += find[i4];
		}
		var found = document.getElementsByClassName(b);
		var arr2 = [];
		for (let i2 = 0; i2 < found.length; i2++) {
			if (found.length > 1) {
				arr2[arr2.length] = found[i2];
				if (found.length == i2 + 1) {
					return arr2;
				}
			} else {
			 return found[i2];
			}
		}
		
	} else {
		// Assume tag
		var tags = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'body', 'title', 'head', 'html', 'p', 'article', 'aside', 'div', 'object', 'style', 'script', 'link'];
		var found = false;
		for (let i5 = 0; i5 < tags.length; i5++) {
			if (find == tags[i5]) {
				found = true;
			}
		}
		if (found == false) {
			console.info('The tag ' + find + 'does not exist in our library, here are our tags that exist \n' + tags);
		}
		var found = document.getElementsByTagName(find);
		var arr3 = [];
		for (let i6 = 0; i6 < found.length; i6++) {
			if (found.length > 1) {
				arr3[arr3.length] = found[i6];
				if (found.length == i6 + 1) {
					return arr3;
				}
			} else {
				return found[i6];
			}
		}
	}
}


var JSPlugs = {
	'localSave': function(name, data) {
		localStorage.setItem('JSPlugs' + name, data);
	},
	'localLoad': function(name, func) {
		var data = localStorage.getItem('JSPlugs' + name);
		if (func.toString() == 'null' | func.toString() == 'undefined') {
			
		} else {
			func(data);
		}
	},
	'readJSPlugsFile': function() {
		
	},
	'newElement': function(a) {
		var b = document.createElement(a);
		return b;
	},
}