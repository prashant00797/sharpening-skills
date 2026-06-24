// Return true if the string reads the same forwards and backwards.
//  Handle the variant that ignores case and non-alphanumeric characters.


function isPalindrome(str) {
    let s = str.toLowerCase().replace(/[^a-z0-9]/g, '');
    let l = 0, r = s.length - 1;
    while (l < r) {
        if (s[l] !== s[r]) return false;
        l++; r--;
    }
    return true;

}
console.log(isPalindrome("rar"))