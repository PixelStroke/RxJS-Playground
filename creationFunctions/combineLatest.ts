import { fromEvent, combineLatest } from 'rxjs';
/**
 * combineLatest
 *
 * Combine and emit the latest array of emitted values.
 *
 * A)--A-----------B---------------C|---->
 * B)--------1---------------2|---------->
 *
 * ()-----[A,1]---[B,1]--[B,2]----[C,2]|-> combineLatest([A,B])
 */

// Temperature Converter
//
const tempInput = document.getElementById('temperature-input');
const conversionDropDown = document.getElementById('conversion-dropdown');
const resultText = document.getElementById('result-text');

const tempInputEvent$ = fromEvent(tempInput, 'input');
const conversionInputEvent$ = fromEvent(conversionDropDown, 'input');

combineLatest([tempInputEvent$, conversionInputEvent$]).subscribe(
  ([tempEvent, convertEvent]) => {
    const temperature = Number(tempEvent.target['value']);
    const conversion = convertEvent.target['value'];

    let result: number;

    if (conversion == 'f-to-c') {
      result = ((temperature - 32) * 5) / 9;
    } else {
      result = (temperature * 9) / 5 + 32;
    }

    resultText.innerText = String(result);

    // console.log(
    //   `Temperature Value: ${tempEvent.target['value']}`,
    //   `Conversion Value: ${convertEvent.target['value']}`
    // );
  }
);
