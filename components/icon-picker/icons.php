<?php
/**
 * Icons
 *
 * @package tenup\BlockComponents
 */

namespace tenup\BlockComponents\Components;

/**
 * Class encapsulating and implementing Icons.
 *
 * @access private
 */
class Icons {

	/**
	 * Config.
	 *
	 * @var array
	 */
	private $icon_sets = array();

	/**
	 * Container for the main instance of the class.
	 *
	 * @var \tenup\BlockComponents\Icons|null
	 */
	private static $instance = null;

	/**
	 * Utility method to retrieve the main instance of the class.
	 *
	 * The instance will be created if it does not exist yet.
	 *
	 * @return \tenup\BlockComponents\Icons The main instance.
	 */
	public static function get_instance() {

		if ( null === self::$instance ) {
			self::$instance = new self();
		}

		return self::$instance;
	}

	/**
	 * Registers an icon set.
	 *
	 * @param  string $icon_set_name    Name of the icon set.
	 * @param  array  $icon_set_options Array containing the properties of the icon set.
	 * @return void
	 */
	public function register( $icon_set_name, $icon_set_options ) {
		$this->icon_sets[ $icon_set_name ] = $icon_set_options;
	}

	/**
	 * Retrieves an icon set.
	 *
	 * @param string $icon_set Name of the icon set.
	 */
	public function get_icons( $icon_set ) {

		if ( empty( $this->icon_sets[ $icon_set ] ) ) {
			return '';
		}

		$icons = $this->icon_sets[ $icon_set ];

		return $icons;
	}

	/**
	 * Retrieve a serialized icon set.
	 *
	 * @param  string $icon_set Name of the icon set.
	 * @return array
	 */
	public function get_serialized_icons( $icon_set ) {

		$icons = $this->get_icons( $icon_set );

		if ( empty( $icons['icons'] ) ) {
			return [];
		}

		$serialized_icons = array_map(
			function( $icon ) {
				return $icon->serialize_icon();
			},
			$icons['icons']
		);

		return $serialized_icons;
	}

	/**
	 * Retrieves the icon object.
	 *
	 * @param  string $icon_set  Name of the icon set.
	 * @param  string $icon_name Name of the icon.
	 * @return \tenup\BlockComponents\Icon|null
	 */
	public function get_icon( $icon_set, $icon_name ) {

		$icons = $this->get_icons( $icon_set );

		if ( empty( $icons['icons'] ) ) {
			return null;
		}

		$icon = $this->find_icon_by_name( $icon_name, $icons['icons'] );

		return $icon;
	}

	/**
	 * Outputs the markup of the desired icon.
	 *
	 * @param  string $icon_set  Name of the icon set.
	 * @param  string $icon_name Name of the icon.
	 * @return void
	 */
	public function render_icon( $icon_set, $icon_name ) {

		$icon = $this->get_icon( $icon_set, $icon_name );

		if ( empty( $icon ) ) {
			return;
		}

		$icon->render();
	}

	/**
	 * Find icon by name.
	 *
	 * @param  string $name  Icon name.
	 * @param  array  $icons List of icons.
	 * @return object|false
	 */
	public function find_icon_by_name( $name, $icons ) {

		foreach ( $icons as $icon ) {
			if ( $name === $icon->get_name() ) {
				return $icon;
			}
		}

		return false;
	}
}
