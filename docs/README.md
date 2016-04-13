## Objects

<dl>
<dt><a href="#Bootstrap">Bootstrap</a> : <code>object</code></dt>
<dd></dd>
<dt><a href="#BootstrapMail">BootstrapMail</a> : <code>object</code></dt>
<dd></dd>
</dl>

<a name="Bootstrap"></a>

## Bootstrap : <code>object</code>
**Kind**: global namespace  

* [Bootstrap](#Bootstrap) : <code>object</code>
    * [.#alert(data, type)](#Bootstrap+alert) ⇒ <code>[BootstrapResult](#new_BootstrapResult_new)</code>
    * [.#label(data, type)](#Bootstrap+label) ⇒ <code>[BootstrapResult](#new_BootstrapResult_new)</code>
    * [.#progress(data)](#Bootstrap+progress) ⇒ <code>[BootstrapResult](#new_BootstrapResult_new)</code>
    * [.#badge(data)](#Bootstrap+badge) ⇒ <code>[BootstrapResult](#new_BootstrapResult_new)</code>
    * [.#well(data)](#Bootstrap+well) ⇒ <code>[BootstrapResult](#new_BootstrapResult_new)</code>

<a name="Bootstrap+alert"></a>

### bootstrap.#alert(data, type) ⇒ <code>[BootstrapResult](#new_BootstrapResult_new)</code>
Create a Bootstrap styled alert.

**Kind**: instance method of <code>[Bootstrap](#Bootstrap)</code>  
**Returns**: <code>[BootstrapResult](#new_BootstrapResult_new)</code> - A BootstrapResult object.  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>Object</code> | An Object containing required data. |
| data.title | <code>string</code> | Alert title. |
| data.content | <code>string</code> | Alert body content. |
| type | <code>string</code> | An alert type which controls colors. Valid                                  types are: success, info, warning, danger. |

<a name="Bootstrap+label"></a>

### bootstrap.#label(data, type) ⇒ <code>[BootstrapResult](#new_BootstrapResult_new)</code>
Create a Bootstrap styled label.

**Kind**: instance method of <code>[Bootstrap](#Bootstrap)</code>  
**Returns**: <code>[BootstrapResult](#new_BootstrapResult_new)</code> - A BootstrapResult object.  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>string</code> | A string to be displayed inside the label |
| type | <code>string</code> | An alert type which controls colors. Valid                              types are: default, primary, success, info,                              warning, danger. |

<a name="Bootstrap+progress"></a>

### bootstrap.#progress(data) ⇒ <code>[BootstrapResult](#new_BootstrapResult_new)</code>
Create a Bootstrap styled progress meter.

**Kind**: instance method of <code>[Bootstrap](#Bootstrap)</code>  
**Returns**: <code>[BootstrapResult](#new_BootstrapResult_new)</code> - A BootstrapResult object.  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>string</code> | A string to be displayed inside the badge. |

<a name="Bootstrap+badge"></a>

### bootstrap.#badge(data) ⇒ <code>[BootstrapResult](#new_BootstrapResult_new)</code>
Create a Bootstrap styled badge.

**Kind**: instance method of <code>[Bootstrap](#Bootstrap)</code>  
**Returns**: <code>[BootstrapResult](#new_BootstrapResult_new)</code> - A BootstrapResult object.  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>string</code> | A string to be displayed inside the badge. |

<a name="Bootstrap+well"></a>

### bootstrap.#well(data) ⇒ <code>[BootstrapResult](#new_BootstrapResult_new)</code>
Create a Bootstrap styled well.

**Kind**: instance method of <code>[Bootstrap](#Bootstrap)</code>  
**Returns**: <code>[BootstrapResult](#new_BootstrapResult_new)</code> - A BootstrapResult object.  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>string</code> | A string to be displayed inside the well. |

<a name="BootstrapMail"></a>

## BootstrapMail : <code>object</code>
**Kind**: global namespace  
<a name="BootstrapMail+mail"></a>

### bootstrapMail.#mail(message) ⇒ <code>boolean</code>
Simple wrapper for sendMail method to require HTML format.

**Kind**: instance method of <code>[BootstrapMail](#BootstrapMail)</code>  
**Returns**: <code>boolean</code> - True if mail was queued to send.  

| Param | Type | Description |
| --- | --- | --- |
| message | <code>Object</code> | A message object. |

