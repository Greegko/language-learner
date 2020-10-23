import * as React from 'react';

import './icon.scss';
export const Icon = ({ icon }: { icon: string }) => <i className={"icon icon-" + icon}></i>;
