<?php
/**
 * @license For the full license information, please view the Licensing folder
 * that was distributed with this source code.
 *
 * @package Woohoo News Theme
 */

// Prevent direct script access.
if ( ! defined( 'ABSPATH' ) ) {
	die( 'No direct script access allowed' );
}

function woohoo_bgop($input,$head = true)
{
    $current_value = woohoo_get_option($input['id']);
    $bd_option = unserialize(get_option('bdayh_setting'));

    $class_name = (isset($input['class'])) ? $input['class'] : "";
    echo "\n".'<div id="'. $input['id'] .'_conent" class="bd_option_item '. $class_name .'">' ."\n";
    if ( !empty($input['tip']) && $input['tip'] != ' ' )
    {
        echo '<a class="bd_help" title="'. $input['tip'] .'"></a>'."\n";
    }
    if ( !empty($input['name']) && $input['name'] != ' ' )
    {
        echo '<h3>'. $input['name'] .'</h3>'."\n";
    }
    if ( !empty($input['exp']) && $input['exp'] != ' ' )
    {
        echo '<p class="bd-exp">'. $input['exp'] .'</p>' ."\n";
    }
    ?>
    <div class="clear"></div>
    <div class="color-area">
        <div id="<?php echo $input['id']; ?>colorselect" class="colorSelector">
            <div class="color-see" <?php if( !empty($current_value['color']) && $current_value['color'] ) { ?> style="background-color:<?php echo $current_value['color'] ; ?>;" <?php } ?>></div>
        </div>
        <input id="<?php echo $input['id']; ?>_color" class="input_numb color_input " type="text" name="<?php echo $input['id']; ?>[color]" value="<?php  if( !empty($current_value['color']) && $current_value['color'] ) echo $current_value['color'] ; ?>" />
    </div>
    <script type="text/javascript">
        jQuery(document).ready(function()
        {
            jQuery('#<?php echo $input['id']; ?>colorselect').ColorPicker
            ({
                color: '#FFFFFF',
                onShow: function (colpkr)
                {
                    jQuery(colpkr).stop().fadeIn();
                    return false;
                },
                onHide: function (colpkr)
                {
                    jQuery(colpkr).hide();
                    return false;
                },
                onChange: function (hsb, hex, rgb)
                {
                    jQuery('#<?php echo $input['id']; ?>colorselect .color-see').css('backgroundColor', '#' + hex);
                    jQuery('#<?php echo $input['id']; ?>'+'_color').val('#' + hex);
                }
            });
        });
    </script>
    <select class="tybo-style" name="<?php echo $input['id']; ?>[repeat]" id="<?php echo $input['id']; ?>[repeat]">
        <option value="" <?php if ( empty($current_value['repeat']) ) { echo ' selected="selected"' ; } ?>></option>
        <option value="repeat" <?php if ( !empty($current_value['color']) && $current_value['color']  == 'repeat' ) { echo ' selected="selected"' ; } ?>>repeat</option>
        <option value="no-repeat" <?php if ( !empty($current_value['color']) && $current_value['color']  == 'no-repeat') { echo ' selected="selected"' ; } ?>>no-repeat</option>
        <option value="repeat-x" <?php if ( !empty($current_value['color']) && $current_value['color'] == 'repeat-x') { echo ' selected="selected"' ; } ?>>repeat-x</option>
        <option value="repeat-y" <?php if ( !empty($current_value['color']) && $current_value['color'] == 'repeat-y') { echo ' selected="selected"' ; } ?>>repeat-y</option>
    </select>
    <select class="tybo-style" name="<?php echo $input['id']; ?>[attachment]" id="<?php echo $input['id']; ?>[attachment]">
        <option value="" <?php if ( empty($current_value['repeat']) ) { echo ' selected="selected"' ; } ?>></option>
        <option value="fixed" <?php if ( !empty($current_value['color']) && $current_value['color']  == 'fixed' ) { echo ' selected="selected"' ; } ?>>Fixed</option>
        <option value="scroll" <?php if ( !empty($current_value['color']) && $current_value['color']  == 'scroll') { echo ' selected="selected"' ; } ?>>scroll</option>
    </select>
    <select class="tybo-style" name="<?php echo $input['id']; ?>[hor]" id="<?php echo $input['id']; ?>[hor]">
        <option value="" <?php if ( empty($current_value['repeat']) ) { echo ' selected="selected"' ; } ?>></option>
        <option value="left" <?php if ( !empty($current_value['color']) && $current_value['color']  == 'left' ) { echo ' selected="selected"' ; } ?>>Left</option>
        <option value="right" <?php if ( !empty($current_value['color']) && $current_value['color']  == 'right') { echo ' selected="selected"' ; } ?>>Right</option>
        <option value="center" <?php if ( !empty($current_value['color']) && $current_value['color'] == 'center') { echo ' selected="selected"' ; } ?>>Center</option>
    </select>
    <select class="tybo-style" name="<?php echo $input['id']; ?>[ver]" id="<?php echo $input['id']; ?>[ver]" >
        <option value="" <?php if ( empty($current_value['repeat']) ) { echo ' selected="selected"' ; } ?>></option>
        <option value="top" <?php if ( !empty($current_value['color']) && $current_value['color']  == 'top' ) { echo ' selected="selected"' ; } ?>>Top</option>
        <option value="center" <?php if ( !empty($current_value['color']) && $current_value['color'] == 'center') { echo ' selected="selected"' ; } ?>>Center</option>
        <option value="bottom" <?php if ( !empty($current_value['color']) && $current_value['color']  == 'bottom') { echo ' selected="selected"' ; } ?>>Bottom</option>
    </select>
    <div class="clear"></div>

    <input id="<?php echo $input['id']; ?>" class="img-path" size="20" type="text" name="<?php echo $input['id']; ?>[img]" value="<?php if( !empty($current_value['color']) && $current_value['color'] ) echo $current_value['img']; ?>" />
    <input id="upload_<?php echo $input['id']; ?>_button" type="button" class="btn st_upload_button" value="Upload" />

    <div id="<?php echo $input['id']; ?>-preview" class="img-preview upload_img" <?php if( empty($current_value['img']) ){echo 'style="display:none;"'; } ?>>
        <img src="<?php if( !empty($current_value['img']) && $current_value['img'] ) echo $current_value['img']; else echo get_template_directory_uri().'/framework/admin/images/spacer.png'; ?>" alt="" />
        <a class="del-img btn remove_img bd-del" title="Delete"></a>
    </div>
    <script type='text/javascript'>
        jQuery('#<?php echo $input['id']; ?>').change(function(){
            jQuery('#<?php echo $input['id']; ?>-preview').show();
            jQuery('#<?php echo $input['id']; ?>-preview img').attr("src", jQuery(this).val());
        });
        woohoo_set_uploader( '<?php echo $input['id']; ?>' );
    </script>

    <?php
    echo '</div>'."\n";
}