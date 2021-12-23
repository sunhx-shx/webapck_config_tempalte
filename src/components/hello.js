import { divide } from 'lodash';
import React, {Component} from 'react';
import getInfo from '../test';

let name = 'Hello World!';

export default class Hello extends Component{
  render() {
    return (
      <div>
        { getInfo() }
        {name}
      </div>
    );
  }
}
