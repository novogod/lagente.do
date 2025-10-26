<?php
/**! Do not allow directly accessing this file.
 * ------------------------------------------------ */
if ( ! defined( 'ABSPATH' ) ) exit( 'Direct script access denied.' );

function bdaia_shorty_clear() {
	return '<div class="clear-fix"></div>';
}
add_shortcode( 'clear', 'bdaia_shorty_clear' );