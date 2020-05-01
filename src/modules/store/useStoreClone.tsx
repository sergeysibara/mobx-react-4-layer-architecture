import { toJS } from "mobx";
import { useEffect, useState } from "react";

const useStoreClone = (storeValue) =>{
  const storeValueClone = toJS(storeValue);
  const [storeValueCloneObservable, setLocalStoreValue] = useState(storeValueClone);

  useEffect(()=>{
    setLocalStoreValue(storeValue);
  },[storeValue]);

  return [storeValueCloneObservable, setLocalStoreValue];
};

export default useStoreClone;
